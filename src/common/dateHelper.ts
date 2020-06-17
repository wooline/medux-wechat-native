const regYear = new RegExp('(y+)', 'i');

function timeFormat(num: number) {
  return num < 10 ? '0' + num : num;
}

export function dateFormat(timestamp?: number, format: string = '/') {
  const realDate = timestamp ? new Date(timestamp) : new Date();
  //format = 'yyyy/MM/dd hh:mm:ss';
  if (format.length === 1) {
    return [realDate.getFullYear(), timeFormat(realDate.getMonth() + 1), timeFormat(realDate.getDate())].join(format);
  } else {
    const date = [
      ['M+', timeFormat(realDate.getMonth() + 1)],
      ['d+', timeFormat(realDate.getDate())],
      ['h+', timeFormat(realDate.getHours())],
      ['m+', timeFormat(realDate.getMinutes())],
      ['s+', timeFormat(realDate.getSeconds())],
      ['q+', Math.floor((realDate.getMonth() + 3) / 3)],
      ['S+', realDate.getMilliseconds()],
    ];
    const reg1 = regYear.exec(format);
    // console.log(reg1[0]);
    if (reg1) {
      format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length));
    }
    for (let i = 0; i < date.length; i++) {
      const k = date[i][0];
      const v = date[i][1];

      const reg2 = new RegExp('(' + k + ')').exec(format);
      if (reg2) {
        format = (format as any).replace(reg2[1], reg2[1].length == 1 ? v : ('00' + v).substring(('' + v).length));
      }
    }
    return format;
  }
}
