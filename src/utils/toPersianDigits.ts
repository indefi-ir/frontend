// ts-ignore

export default function toPersianDigits (num:any) {
  if (num?.toString()) {
    const persianNumbers =
      '\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9'
    return new String(num).replace(/[0123456789]/g, (d:any) => {
      return persianNumbers[d]
    })
  }
  return num
}