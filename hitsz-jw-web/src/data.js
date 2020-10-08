import API from "./api.js"
// 数据储存格式：
// 本地储存中: 
// week-1 ~ week17
// user

export default {
  get_by_week: async function(week) {
    try {
      let data = localStorage.getItem('week-' + week)
      return data
    } catch(err) {
      let res = await API.get_by_week(week)
      set_week(week, res)
      return res
    }
  },
  get_user: async function () {
    try {
      let data = localStorage.getItem('user')
      return data
    } catch(err) {
      return undefined
    }
  },
  set_user: function (username, password) {
    localStorage.setItem('user', JSON.stringify({
      username: username,
      password: password
    }))
  },
  set_week: function (week, data) {
    localStorage.setItem('week-' + week, JSON.stringify(data))
  },
}