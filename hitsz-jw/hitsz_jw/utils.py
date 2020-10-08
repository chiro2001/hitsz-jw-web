from functools import wraps
from flask import request, abort, jsonify
import traceback
from hitsz_jw.base_logger import logger
from hitsz_jw import config

"""
返回值格式：
{
    code: ...,
    message: ...,
    data: ...,
}
"""


def make_result(code: int, message=None, data=None):
    result = {
        'code': code,
    }
    # 根据code选message
    if message is None:
        try:
            result['message'] = config.code[str(code)]
        except ValueError:
            logger.warning('Error code %s not found!' % code)
            result['message'] = config.code['0']
    else:
        result['message'] = message
    if data is not None:
        # 一定要删除所有_id元素
        result['data'] = data
    return result


def make_error_result(error):
    return make_result(1, message=str(error))

