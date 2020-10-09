class ResultMessage:
    class Error:
        error = '未知错误'
        data = '数据错误'
        login = '登录失败'
        args = '参数错误'
        userNotFound = '用户未找到'
        permissionNotEnough = '你没有执行动作的权利'

    class Success:
        success = '成功'


code = {
    '0': ResultMessage.Success.success,
    '1': ResultMessage.Error.error,
    '2': ResultMessage.Error.data,
    '3': ResultMessage.Error.login,
    '5': ResultMessage.Error.args,
    '10': ResultMessage.Error.permissionNotEnough,
    '11': ResultMessage.Error.userNotFound,
}

secret = "AABBCCDD"

host = '0.0.0.0'
port = 8003
debug = False
version = 1
