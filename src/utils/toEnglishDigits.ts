export default function toEnglishDigits(num: any) {
  var e = "۰"?.charCodeAt(0);
  num = num?.replace(/[۰-۹]/g, function (t: any) {
    return t?.charCodeAt(0) - e;
  });
  return num;
}
