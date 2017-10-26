import {fetch} from './http'
import {loginRemote} from './uri'
export function login (option) {
  let url = loginRemote
  return fetch(url, option)
}
