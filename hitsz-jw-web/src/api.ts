import axios from 'axios'
// import Data from "./data.js"

export default class {
  public api_base = 'http://localhost/api/v1'
  public api = {
    login: this.api_base + '/login/',
    get_table_by_week: this.api_base + '/get_table_by_week/'
  }
  public async login(username: string, password: string) {
    try {
      const d = await axios.get(this.api.login, {
        params: {
          username: username,
          password: password
        }
      })
      if (d.status !== 200) {
        throw "error. code=" + d.status + '; ' + d.data;
      }
      // console.log(d.data)
      let data = d.data
      return data
    } catch (err) {
      console.log(err)
    }
  }
  public async get_table_by_week(token: string, week: number) {
    try {
      const d = await axios.get(this.api.get_table_by_week, {
        params: {
          week: week,
          token: token
        }
      })
      // console.log(d.data)
      let data: object = {};
      try {
        data = JSON.parse(d.data)
      } catch(err) {
        data = d.data
      }
      return data
    } catch (err) {
      console.log(err)
    }
  }
}