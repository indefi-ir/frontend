import moment from "moment";

export default function dateFormat(value:string, format = 'YYYY-MM-DD') {
  return moment(value).format(format);
}