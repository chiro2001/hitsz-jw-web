from flask import *
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from hitsz_jw import config
from hitsz_jw.jw import JW
from hitsz_jw.database import db
from hitsz_jw.utils import make_result


class HitJWServer:
    class Login(Resource):
        def get(self):
            parser = reqparse.RequestParser()
            parser.add_argument('username', type=str, required=True)
            parser.add_argument('password', type=str, required=True)
            args = parser.parse_args()
            username, password = args['username'], args['password']
            jw = JW()
            if not jw.login(username, password):
                return make_result(3)  # login error
            # cookies = jw.get_cookies()
            try:
                db.token_find_by_uid(username)
                db.token_destroy(uid=username)
            except db.JWSessionDBExceptions.ObjectNotFound:
                pass
            token_data = db.token_create(username, {'username': username, 'password': password})
            return make_result(0, data=token_data)

    class GetTableByWeek(Resource):
        def get(self):
            parser = reqparse.RequestParser()
            parser.add_argument('week', type=int, required=True)
            parser.add_argument('token', type=str, required=True)
            parser.add_argument('xn', type=str, required=False)
            args = parser.parse_args()
            week = args['week']
            token = args['token']
            xn = args['xn']
            try:
                token_data = db.token_find_by_token(token)
            except db.JWSessionDBExceptions.ObjectNotFound:
                return make_result(3)  # login error
            jw = JW()
            if not jw.login(token_data['data']['username'], token_data['data']['password']):
                return make_result(3)  # login error
            if not jw.login_check():
                return make_result(3)  # login error
            data = jw.get_table_by_week(week=week, xn=xn)
            if data is None:
                return make_result(1)  # unknown error
            return make_result(0, data=data)

    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app, supports_credentials=True)
        self.api = Api(self.app, prefix='/api/v%s' % config.version)
        self.api.add_resource(HitJWServer.Login, '/login/')
        self.api.add_resource(HitJWServer.GetTableByWeek, '/get_table_by_week/')

    def run(self):
        self.app.run(config.host, port=config.port, debug=config.debug)


if __name__ == '__main__':
    _server = HitJWServer()
    _server.run()
