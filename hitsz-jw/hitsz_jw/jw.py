import re
import json
from datetime import datetime
import requests
import requests.utils
from bs4 import BeautifulSoup as Soup


class JW:
    headers = {
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36 Edg/85.0.564.63',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Accept-Encoding': 'gzip, deflate',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
    }
    # verify_debug = False
    verify_debug = True
    table_start_at = [{'month': 2, 'day': 8}, {'month': 8, 'day': 31}]
    table_stop_at = [{'month': 6, 'day': 20}, {'month': 1, 'day': 10}]
    class_time = [
        [],
        ['8:30', '10:15'],
        ['10:30', '12:15'],
        ['14:00', '15:45'],
        ['16:00', '17:45'],
        ['18:45', '20:30']
    ]

    class API:
        login = 'https://sso.hitsz.edu.cn:7002/cas/login?service=http%3A%2F%2Fjw.hitsz.edu.cn%2FcasLogin'
        login_check = 'http://jw.hitsz.edu.cn/xszykb/querykbsffb'
        jw_host = 'http://jw.hitsz.edu.cn/'
        table_by_week = 'http://jw.hitsz.edu.cn/xszykb/queryxszykbzhou'

    @staticmethod
    def get_xn(date: str) -> str or None:
        split = date.split('-')
        split = list(map(lambda x: int(x), split))
        if len(split) not in [2, 3]:
            return None
        try:
            if len(split) == 2:
                year, month = split
                day = 1
            else:
                year, month, day = split
        except ValueError:
            return None
        result = "%s-%s" % (year - 1, year)
        if month >= 9 or (month == 8 and day == 31) or (month == 1 and day <= 10):
            result = '%s-%s' % (year, year + 1)
        return result

    @staticmethod
    def get_week(date: str, start_time: str) -> int:
        split = list((date.split('-'), start_time.split('-')))
        split = list(map(lambda x: list(map(lambda y: int(y), x)), split))
        if len(split[0]) != 3 or len(split[1]) != 3:
            return 0
        d = [None, None]
        for i in range(2):
            d[i] = datetime(year=split[i][0], month=split[i][1], day=split[i][2])
        days = (d[0] - d[1]).days
        weeks = days // 7 + 1
        return weeks

    @staticmethod
    def parse_table_data(data: dict):
        lines = data['SKSJ'].split('\n')
        span = re.search("xq[0-9]{1,2}", data['KEY']).span()
        weekday = int(data['KEY'][span[0] + 2: span[1]])
        span = re.search("jc[0-9]{1,2}", data['KEY']).span()
        duration = int(data['KEY'][span[0] + 2: span[1]])
        # print(duration)
        return {
            'name': lines[0],
            'teacher': lines[1][1:-1],
            'classroom': lines[2].split('][')[-1][:-1],
            'weekday': weekday,
            'duration': JW.class_time[duration],
            'available': True if data['XB'] != 0 else False
        }

    def __init__(self):
        self.s = requests.Session()
        self.s.headers = self.headers

    def load_cookies(self, cookies: dict):
        self.s.cookies.update(cookies)
        return self

    def get_cookies(self) -> dict:
        return self.s.cookies.get_dict()

    def get_login_params(self, username: str, password: str):
        url = JW.API.login
        response = self.s.get(url, verify=JW.verify_debug)
        cookies = response.cookies
        cookie = requests.utils.dict_from_cookiejar(cookies)
        JSESSIONID = cookie['JSESSIONID']
        text = response.text
        span = re.search('value="LT-.+?-cas"', text).span()
        lt = text[span[0] + 7: span[1] - 1]
        span = re.search('name="execution" value=".+?"', text).span()
        execution = text[span[0] + 24: span[1] - 1]
        params = {
            'cookies': {
                'JSESSIONID': JSESSIONID,
                'j_username': username
            },
            'data': {
                "username": username,
                "password": password,
                "rememberMe": "on",
                "lt": lt,
                "execution": execution,
                "_eventId": "submit",
                "vc_username": "",
                "vc_password": ""
            }
        }
        return params

    def login(self, username: str, password: str) -> bool:
        if not self.get_route():
            raise Exception("Unknown error.")
        params = self.get_login_params(username, password)
        url = JW.API.login
        response = self.s.post(url, data=params['data'], allow_redirects=True, verify=JW.verify_debug)
        # print(Soup(response.content, 'html.parser').get_text())
        if '账号登录' in response.text:
            return False
        return True

    def get_route(self) -> bool:
        response = self.s.get(JW.API.jw_host, verify=JW.verify_debug)
        cookies = response.cookies
        cookie = requests.utils.dict_from_cookiejar(cookies)
        if 'route' not in cookie:
            return False
        return True

    def login_check(self):
        print(self.s.cookies.get_dict())
        response = self.s.post(JW.API.login_check, headers={
            'Origin': 'http://jw.hitsz.edu.cn',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': 'http://jw.hitsz.edu.cn/authentication/main',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }, verify=JW.verify_debug, data={
            'xn': '2020-2021',
            'xq': '1'
        }, allow_redirects=False)
        if response.status_code == 302:
            return False
        if 'session已失效' in response.text:
            print('session已失效')
            return False
        return True

    def get_table_by_week(self, week: int, xq: int = 1, xn: str = None) -> list or None:
        response = self.s.post(JW.API.table_by_week, verify=JW.verify_debug, data={
            'xn': self.get_xn(str(datetime.today())[:10]) if xn is None else xn,
            'xq': xq,
            'zc': week
        }, allow_redirects=False)
        if response.status_code != 200:
            return None
        js = json.loads(response.content)
        result = []
        for i in js:
            result.append(self.parse_table_data(i))
        return result


jw = JW()

if __name__ == '__main__':
    _jw = JW()
    if not _jw.login('200110619', '1352040930lxr'):
        raise Exception('Login ERROR.')
    print('check', _jw.login_check())
    # print(_jw.get_table_by_week(_jw.get_week('2020-10-3', '2020-8-31')))
    print(_jw.get_table_by_week(5))
