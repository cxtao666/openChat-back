// 传进来时间戳，返回 ${year}-${month}-${day} ${hour}:${minute}:${second} 的时间格式
export const timeStampToString = (now: number | string) => {
  const newDate = new Date(now);
  const year = newDate.getFullYear();
  const month =
    newDate.getMonth() + 1 > 10
      ? newDate.getMonth() + 1
      : '0' + (newDate.getMonth() + 1);
  const day =
    newDate.getDate() >= 10 ? newDate.getDate() : '0' + newDate.getDate();
  const hour =
    newDate.getHours() > 10 ? newDate.getHours() : '0' + newDate.getHours();
  const minute =
    newDate.getMinutes() > 10
      ? newDate.getMinutes()
      : '0' + newDate.getMinutes();
  const second =
    newDate.getSeconds() > 10
      ? newDate.getSeconds()
      : '0' + newDate.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
