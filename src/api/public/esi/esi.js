import request from '@/utils/request'

export function getTypes() {
  return request({
    url: '/helper/china/getAllTypes',
    method: 'get'
  })
}

export function getTypeInfo() {
  return request({
    url: '/helper/china/getTypeInfo',
    method: 'get'
  })
}

export function getMarketGroups() {
  return request({
    url: '/helper/china/marketGroups',
    method: 'get'
  })
}

export function getGroupInfo() {
  return request({
    url: '/helper/china/getGroupInfo',
    method: 'get'
  })
}

export function getMarketGroupsList() {
  return request({
    url: '/helper/china/getMarketGroups',
    method: 'get'
  })
}

export function getMarketType(query) {
  return request({
    url: '/helper/china/getMarketType',
    method: 'get',
    params: query
  })
}

export function getMarketGroupsTree(group_id) {
  return request({
    url: '/helper/china/getMarketGroups/' + group_id,
    method: 'get'
  })
}

export function searchType(type_name) {
  return request({
    url: '/helper/china/searchType?type_name='+type_name,
    method: 'get',
  })
}

export function asyncEsiMarketHistory(query) {
  return request({
    url: '/helper/china/asyncEsiMarketHistory',
    method: 'get',
    params: query
  })
}