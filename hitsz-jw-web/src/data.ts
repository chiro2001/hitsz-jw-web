import moment from "moment"
import API from "./api"
import utils from "./utils.js"
// 数据储存格式：
// 本地储存中: 
// week-1 ~ week17
// user

export default class {
  public api = new API();
  public token = '';
  // public debug = true;
  public debug = false;
  public check_week(week: number) {
    return localStorage.getItem('week-' + week);
  }
  public async get_by_week(week: number) {
    try {
      let data = undefined;
      let got = this.check_week(week);
      if (!got || this.debug)
        data = await this.api.get_table_by_week(this.token, week);
      else
        data = JSON.parse(got);
      if (data.code !== 0)
        return undefined;
      data.data.sort((a: any, b: any) => {
        return utils.getDataTime(a) - utils.getDataTime(b);
      });
      this.set_week(week, data);
      return data
    } catch (err) {
      return undefined;
    }
  }
  public get_user() {
    try {
      let data = {};
      let got = localStorage.getItem('user');
      if (!got || this.debug)
        return undefined;
      else
        data = JSON.parse(got);
      return data;
    } catch (err) {
      return undefined
    }
  }
  public set_user(data: any) {
    this.token = data.token;
    localStorage.setItem('user', JSON.stringify(data))
  }
  public set_week(week: number, data: object) {
    localStorage.setItem('week-' + week, JSON.stringify(data))
  }
  public remove_weeks() {
    for (let i=0; i<=100; i++)
      localStorage.removeItem('week-' + i);
  }
  public clear() {
    localStorage.clear();
  }
}