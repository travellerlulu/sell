export function formatDate (date, fmt) {
  'use strict';
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let obj = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let key in obj) {
    if (new RegExp(`(${key})`).test(fmt)) {
      let val = '' + obj[key];
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length === 1) ? val : padLeftZero(val)));
    }
  }
  return fmt;
}
function padLeftZero (str) {
  'use strict';
  return ('00' + str).substr(str.length);
}

