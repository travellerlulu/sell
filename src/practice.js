function markWords(wordsArr, str) {
  var re = '';
  for(var i = 0; i < wordsArr.length; i++) {
    re += wordsArr[i] + ((i === wordsArr.length - 1) ? '' : '|');
  }
  var reg = new RegExp(re,'g');
  return reg.test(str);
}
var wordsArr = ["习近平","周永康","中共","6.4"];
markWords(wordsArr,'咖啡壶可是就打瞌睡');
