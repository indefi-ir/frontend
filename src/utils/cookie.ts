import Cookies from 'js-cookie';

export function setCookie(name: string, value: string) {
  Cookies.set(name, value);
}

export function getCookie(name: string) {
  return Cookies.get(name);
}

export function removeCookie(name: string) {
  Cookies.remove(name);
}

export function deleteCookie(name: string) {
  Cookies.remove(name);
}