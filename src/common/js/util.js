/*
 * 解析url
 * @example ?id=12345&a=b
 * @return { id:12345,a:b}
 * */
export function urlParse () {
  'use strict';
  let url = window.location.search;
  let reg = /[?&][^?&]+=[^?&]+/g;
  let obj = {};
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let tmpArr = item.substr(1).split('=');
      let key = decodeURIComponent(tmpArr[0]);
      let val = decodeURIComponent(tmpArr[1]);
      obj[key] = val;
    })
  }
  return obj;
}
