import requests
import requests.utils
import re
import time

username = '200110619'
password = '1352040930lxr'
headers_list = [
    # {"name": "Accept", "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"},
    {'name': 'Accept', 'value': '*/*'},
    # {"name": "Accept-Encoding", "value": "gzip, deflate, br"},
    # {"name": "Accept-Language", "value": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2"},
    {"name": "Connection", "value": "keep-alive"},
    # {"name": "Content-Length", "value": "159"},
    # {"name": "Content-Type", "value": "application/x-www-form-urlencoded"},
    # {"name": "Cookie", "value": "JSESSIONID=30F779D3F215C26BEDCEDF810D11FBC6; j_username=200110619"},
    # {"name": "Host", "value": "sso.hitsz.edu.cn:7002"},
    # {"name": "Origin", "value": "https://sso.hitsz.edu.cn:7002"},
    # {"name": "Referer", "value": "https://sso.hitsz.edu.cn:7002/cas/login"},
    # {"name": "Upgrade-Insecure-Requests", "value": "1"},
    {"name": "User-Agent", "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:79.0) Gecko/20100101 Firefox/79.0"}]
headers = {}
for header in headers_list:
    headers[header['name']] = header['value']
print(headers)
# 先获取JSESSIONID等参数
url = 'https://sso.hitsz.edu.cn:7002/cas/login'
response = requests.get(url, headers=headers, verify=False)
cookies = response.cookies
cookie = requests.utils.dict_from_cookiejar(cookies)
print(cookie)
JSESSIONID = cookie['JSESSIONID']
text = response.text
span = re.search('value="LT-.+?-cas"', text).span()
lt = text[span[0] + 7: span[1] - 1]
print(lt)
span = re.search('name="execution" value=".+?"', text).span()
execution = text[span[0] + 24: span[1] - 1]
print(execution)

with open('get.html', 'wb') as f:
    f.write(response.content)
#
# time.sleep(0.5)
#
# # post带JSESSIONID的url
# url = 'https://sso.hitsz.edu.cn:7002/cas/login;jsessionid=%s' % JSESSIONID
# response = requests.post(url, cookies={
#     'JSESSIONID': JSESSIONID,
#     # 'j_username': username
# }, data={
#     "username": username,
#     "password": password,
#     # "rememberMe": "on",
#     # "lt": "LT-68845-BesidW7b4OKGUQ97deX0QAOYiHsOQA-cas",
#     # "execution": "e1s1",
#     # "_eventId": "submit",
#     # "vc_username": "",
#     # "vc_password": ""
# }, headers=headers)
# cookies = response.cookies
# cookie = requests.utils.dict_from_cookiejar(cookies)
# print(response.text)
# print(cookie)
# if '登录成功' in response.text:
#     print('OK')
# with open('post.html', 'wb') as f:
#     f.write(response.content)


url = 'https://sso.hitsz.edu.cn:7002/cas/login'
response = requests.post(url, cookies={
    'JSESSIONID': JSESSIONID,
    'j_username': username
}, data={
    "username": username,
    "password": password,
    "rememberMe": "on",
    "lt": lt,
    "execution": execution,
    "_eventId": "submit",
    "vc_username": "",
    "vc_password": ""
}, headers=headers, verify=False)
cookies = response.cookies
cookie = requests.utils.dict_from_cookiejar(cookies)
print(response.text)
print(cookie)
if '登录成功' in response.text:
    print('OK')
with open('post.html', 'wb') as f:
    f.write(response.content)