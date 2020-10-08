import moment from "moment"

export default {
	showTimeInit: function () {
		moment.locale('zh-cn', {
			months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
			monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
			weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
			weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
			weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
			longDateFormat: {
				LT: 'HH:mm',
				LTS: 'HH:mm:ss',
				L: 'YYYY/MM/DD',
				LL: 'YYYY年MM月DD日',
				LLL: 'YYYY年MM月DD日Ah点mm分',
				LLLL: 'YYYY年MM月DD日ddddAh点mm分',
				l: 'YYYY/M/D',
				ll: 'YYYY年M月D日',
				lll: 'YYYY年M月D日 HH:mm',
				llll: 'YYYY年M月D日dddd HH:mm'
			},
			meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
			meridiemHour: function (hour, meridiem) {
				if (hour === 12) {
					hour = 0;
				}
				if (meridiem === '凌晨' || meridiem === '早上' ||
					meridiem === '上午') {
					return hour;
				} else if (meridiem === '下午' || meridiem === '晚上') {
					return hour + 12;
				} else {
					// '中午'
					return hour >= 11 ? hour : hour + 12;
				}
			},
			meridiem: function (hour, minute, isLower) {
				const hm = hour * 100 + minute;
				if (hm < 600) {
					return '凌晨';
				} else if (hm < 900) {
					return '早上';
				} else if (hm < 1130) {
					return '上午';
				} else if (hm < 1230) {
					return '中午';
				} else if (hm < 1800) {
					return '下午';
				} else {
					return '晚上';
				}
			},
			calendar: {
				sameDay: '[]LTS',
				nextDay: '[明天]LTS',
				nextWeek: '[下]ddddLTS',
				lastDay: '[昨天]LTS',
				lastWeek: '[上]ddddLTS',
				sameElse: 'L'
			},
			dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
			ordinal: function (number, period) {
				switch (period) {
					case 'd':
					case 'D':
					case 'DDD':
						return number + '日';
					case 'M':
						return number + '月';
					case 'w':
					case 'W':
						return number + '周';
					default:
						return number;
				}
			},
			relativeTime: {
				future: '%s内',
				past: '%s前',
				s: '几秒',
				ss: '%d秒',
				m: '1分钟',
				mm: '%d分钟',
				h: '1小时',
				hh: '%d小时',
				d: '1天',
				dd: '%d天',
				M: '1个月',
				MM: '%d个月',
				y: '1年',
				yy: '%d年'
			},
			week: {
				// GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
				dow: 1, // Monday is the first day of the week.
				doy: 4  // The week that contains Jan 4th is the first week of the year.
			}
		})
	},
	showTime: function (utime) {
		// 注意是毫秒数
		// console.log(moment.locale())
		var result = moment(utime).calendar()
		return result
	},

	limitString: function (string) {
		if (string.length > 15)
			string = string.slice(0, 15) + '...'
		string = string.replace('\n', '')
		return string
	},

	colorHex: function (src) {
		// RGB颜色值的正则
		var reg = /^(rgb|RGB)/;
		var color = src;
		if (reg.test(color)) {
			var strHex = "#";
			// 把RGB的3个数值变成数组
			var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
			// 转成16进制
			for (var i = 0; i < colorArr.length; i++) {
				var hex = Number(colorArr[i]).toString(16);
				if (hex === "0") {
					hex += hex;
				}
				strHex += hex;
			}
			return strHex;
		} else {
			return String(color);
		}
	},

	getQuery: function (queryString) {
		if (!queryString.startsWith('?'))
			return {}
		queryString = queryString.slice(1, queryString.length)
		let result = {}
		let li = queryString.split('&')
		for (let i of li) {
			let s = i.split('=')
			if (s.length !== 2)
				continue
			result[s[0]] = s[1]
		}
		return result
	},

	//JS操作cookies方法!
	//写cookies
	setCookie: function (name, value) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	},
	getCookie: function (name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	},
	delCookie: function (name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	},
	//使用示例
	// setCookie("name", "hayden");
	// alert(getCookie("name"));
	//如果需要设定自定义过期时间
	//那么把上面的setCookie　函数换成下面两个函数就ok;
	//程序代码
	getsec: function (str) {
		alert(str);
		var str1 = str.substring(1, str.length) * 1;
		var str2 = str.substring(0, 1);
		if (str2 === "s") {
			return str1 * 1000;
		}
		else if (str2 === "h") {
			return str1 * 60 * 60 * 1000;
		}
		else if (str2 === "d") {
			return str1 * 24 * 60 * 60 * 1000;
		}
	}
	//这是有设定过期时间的使用示例：
	//s20是代表20秒
	//h是指小时，如12小时则是：h12
	//d是天数，30天则：d30
	// setCookie("name", "hayden", "s20");
}