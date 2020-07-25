const fs = require("fs");

/* 圆周率前一亿位，等分成100份文件 */
fs.readFile("圆周率小数点后000000001到100000000一共1亿位.txt", "utf-8", function (error, data) {
  if (!error) {
    const million100 = 100000000; // 一亿
    const divid = 100; // 分成100份
    for (let i = 0; i < divid; i++) {
      const startDigit = i * (million100 / divid);  // 每一份的开始位
      const endDigit = (i + 1) * (million100 / divid);  // 每一份的结束位
      const dividData = data.substring(startDigit, endDigit);
      fs.writeFile(`${startDigit + 1}-${endDigit}.txt`, dividData, 'utf8', function () { })
    }
  }
});