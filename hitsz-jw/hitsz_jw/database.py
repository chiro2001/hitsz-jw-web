import time
import hashlib
from pymongo import MongoClient
from hitsz_jw import config


class JWSessionDB:
    class JWSessionDBExceptions:
        class ObjectNotFound(Exception):
            pass

        class ObjectExist(Exception):
            pass

        class ArgsError(Exception):
            pass

    client_link = None
    collections = ['token', ]
    collection_id = {}

    # 递归删除None节点
    def delete_none_node(self, a: dict) -> dict:
        result = {}
        for d in a:
            if type(a[d]) is dict:
                result[d] = self.delete_none_node(a[d])
            elif a[d] is not None:
                result[d] = a[d]
        return result

    @staticmethod
    def delete_id_node(a: dict) -> dict:
        if '_id' in a:
            del a['_id']
        return a

    @staticmethod
    def delete_user_password(user: dict) -> dict:
        if 'password' in user:
            del user['password']
        return user

    def __init__(self):
        if not self.client_link:
            self.client = MongoClient()
        else:
            self.client = MongoClient(self.client_link)
        self.db = self.client.hitsz_jw

    def db_get_one(self, col_name: str, args: dict):
        result = list(self.db[col_name].find(args))
        if len(result) == 0:
            raise JWSessionDB.JWSessionDBExceptions.ObjectNotFound
        return self.delete_id_node(result[0])

    def db_get(self, col_name: str, args: dict):
        data = list(self.db[col_name].find(args))
        result = []
        for d in data:
            result.append(self.delete_id_node(d))
        return result

    def database_clear_all(self):
        for col in self.collections:
            self.db[col].drop()

    def database_init(self):
        for col in self.collections:
            if col in self.collection_id and \
                    len(list(self.db[col].find({'_id': self.collection_id[col]}, {'_id': 0}))) == 0:
                self.db[col].insert_one({
                    '_id': self.collection_id[col],
                    'sequence_value': 1,
                })

    def get_next_id(self, col_name: str) -> int:
        col = self.db[col_name]
        if col_name not in self.collection_id:
            return 0
        result = col.find_one_and_update({'_id': self.collection_id[col_name]},
                                         {'$inc': {'sequence_value': 1}})
        return result['sequence_value']

    # 创建token，格式：sha1(uid + time.time() + secret)
    # 已经存在token则返回已经存在的token_data
    def token_create(self, uid: str, data: dict) -> dict:
        try:
            query = self.delete_id_node(self.token_find_by_uid(uid))
            return query
        except JWSessionDB.JWSessionDBExceptions.ObjectNotFound:
            pass
        token = hashlib.sha1((str(uid) + str(time.time()) + config.secret).encode()).hexdigest()
        token_data = {
            'uid': uid,
            'token': token,
            'data': data
        }
        self.db.token.insert_one(token_data)
        token_data = self.delete_id_node(token_data)
        return token_data

    def token_find_by_token(self, token: str) -> dict or None:
        return self.db_get_one('token', {'token': token})

    def token_find_by_uid(self, uid: str) -> dict or None:
        return self.delete_id_node(self.db_get_one('token', {'uid': uid}))

    def token_destroy(self, token: str = None, uid: str = None):
        if token is None and uid is None:
            raise JWSessionDB.JWSessionDBExceptions.ArgsError
        query = {}
        if token is not None:
            query['token'] = token
            self.token_find_by_token(token)
        if uid is not None:
            query['uid'] = uid
            self.token_find_by_uid(uid)
        self.db.token.delete_one(query)


def jw_test_all():
    pass


db = JWSessionDB()
if __name__ == "__main__":
    jw_test_all()
