function getMonthDay(date) {
  const month = date.getMonth() + 1;
  let monthDay = 30;
  if (month != 2) {
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) > -1) {
      monthDay = 31;
    }
  } else {
    const isLeapyear = date.getFullYear() % 4 == 0;
    if (isLeapyear) {
      monthDay = 29;
    } else {
      monthDay = 28;
    }
  }
  return monthDay;
}
window.DateUtils = {
  /* 获取一个月的天数 */
  getMonthDay,
  /* 获取两个时间的年月日时分秒之差 */
  getDiffsBetween(date1, date2) {
    function calcDiff(i, T) {
      function calcByNext(j, v1, v2) {
        const next = j <= diffs.length - 1 ? diffs[j] : 1;
        return next > 0 ? v1 : next < 0 ? v2 : calcByNext(j + 1, v1, v2);
      }

      const diff = diffs[i];
      if (diff > 0) {
        return calcByNext(i + 1, diff, diff - 1);
      }
      if (diff == 0) {
        return calcByNext(i + 1, diff, T + diff - 1);
      }
      if (diff < 0) {
        return calcByNext(i + 1, T + diff, T + diff - 1);
      }
    }

    if (date1.getTime() > date2.getTime()) {
      // 交换时间，保证date2>date1
      const t = date1;
      date1 = date2;
      date2 = t;
    }
    const diffs = [
      date2.getFullYear() - date1.getFullYear(),
      date2.getMonth() - date1.getMonth(),
      date2.getDate() - date1.getDate(),
      date2.getHours() - date1.getHours(),
      date2.getMinutes() - date1.getMinutes(),
      date2.getSeconds() - date1.getSeconds(),
      date2.getMilliseconds() - date1.getMilliseconds()
    ];
    return {
      year: calcDiff(0, 1),
      month: calcDiff(1, 12),
      day: calcDiff(2, getMonthDay(date1)),
      hour: calcDiff(3, 24),
      minute: calcDiff(4, 60),
      second: calcDiff(5, 60)
    }
  },
  /* 获取两个时间的相差天数 */
  getDaysBetween(date1, date2) {
    return parseInt((date2.getTime() - date1.getTime()) / (24 * 60 * 60 * 1000));
  },
  /* 格式化日期 yyyy-MM-dd hh:mm:ss */
  formatDate(date, formatStr) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const fyear = "" + year;
    const fmonth = month < 10 ? "0" + month : month;
    const fday = day < 10 ? "0" + day : day;
    const fhour = hour < 10 ? "0" + hour : hour;
    const fminute = minute < 10 ? "0" + minute : minute;
    const fsecond = second < 10 ? "0" + second : second;
    let result = formatStr.replaceAll("yyyy", year);
    result = result.replaceAll("yy", fyear.substr(2, 2));
    result = result.replaceAll("MM", fmonth);
    result = result.replaceAll("M", month);
    result = result.replaceAll("dd", fday);
    result = result.replaceAll("d", day);
    result = result.replaceAll("hh", fhour);
    result = result.replaceAll("h", hour);
    result = result.replaceAll("mm", fminute);
    result = result.replaceAll("m", minute);
    result = result.replaceAll("ss", fsecond);
    result = result.replaceAll("s", second);
    return result;
  },
  /* 解析日期 yyyy-MM-dd hh:mm:ss */
  parseDate(str, formatStr) {
    const date = new Date();
    let index = -1;
    if ((index = formatStr.indexOf("yyyy")) > -1) {
      date.setFullYear(parseInt(str.substr(index, 4)))
    } else if ((index = formatStr.indexOf("yy")) > -1) {
      date.setFullYear(parseInt(str.substr(index, 2)))
    } else {
      date.setFullYear(0);
    }
    if (((index = formatStr.indexOf("MM")) > -1) || ((index = formatStr.indexOf("M")) > -1)) {
      date.setMonth(parseInt(str.substr(index, 2)) - 1)
    } else {
      date.setMonth(0);
    }
    if (((index = formatStr.indexOf("dd")) > -1) || ((index = formatStr.indexOf("d")) > -1)) {
      date.setDate(parseInt(str.substr(index, 2)))
    } else {
      date.setDate(1);
    }
    if (((index = formatStr.indexOf("hh")) > -1) || ((index = formatStr.indexOf("h")) > -1)) {
      date.setHours(parseInt(str.substr(index, 2)))
    } else {
      date.setHours(0);
    }
    if (((index = formatStr.indexOf("mm")) > -1) || ((index = formatStr.indexOf("m")) > -1)) {
      date.setMinutes(parseInt(str.substr(index, 2)))
    } else {
      date.setMinutes(0);
    }
    if (((index = formatStr.indexOf("ss")) > -1) || ((index = formatStr.indexOf("s")) > -1)) {
      date.setSeconds(parseInt(str.substr(index, 2)))
    } else {
      date.setSeconds(0);
    }
    date.setMilliseconds(0);
    return date;
  },
  /* 获取指定日期 */
  getDate(option) {
    const date = new Date();
    if (option) {
      date.setFullYear(option.year || 0);
      date.setMonth(option.month || 0);
      date.setDate(option.day || 0);
      date.setHours(option.hour || 0);
      date.setMinutes(option.minute || 0);
      date.setSeconds(option.second || 0);
      date.setMilliseconds(option.mill || 0);
    }
    return date;
  },

}