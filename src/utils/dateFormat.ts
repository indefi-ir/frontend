import moment from 'jalali-moment';

export default function dateFormat(value:string, format = 'HH:mm:ss jYYYY/jMM/jDD ') {
  return moment(value).format(format);
}