import {fetch} from './http'
import {reportReport1, reportStasticsNumber, reportStasticsWeight, reportStatisticNumMonth} from './uri'
export function report1 (option) {
  let url = reportReport1
  return fetch(url, option)
}
export function getStatisticsNumber (option) {
  let url = reportStasticsNumber
  return fetch(url, option)
}
export function getStatisticsWeight (option) {
  let url = reportStasticsWeight
  return fetch(url, option)
}
export function getStatisticNumMonth (option) {
  let url = reportStatisticNumMonth
  return fetch(url, option)
}
