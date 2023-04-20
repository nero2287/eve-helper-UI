import request from '@/utils/request'

export function cacheSerenityMarketGroups() {
  return request({
    url: '/system/manage/serenity/cacheSerenityMarketGroups',
    method: 'get'
  })
}

export function cacheTranquilityMarketGroups() {
  return request({
    url: '/system/manage/tranquility/cacheTranquilityMarketGroups',
    method: 'get'
  })
}

export function checkCacheProgress() {
  return request({
    url: '/system/manage/checkCacheProgress',
    method: 'get',
  })
}

export function getMarketGroupTree(group_id,dataSource) {
  return request({
    url: '/helper/markets/getMarketGroupTree/' + group_id+'?dataSource='+dataSource,
    method: 'get',
    headers:{
      isToken:false
    }
  })
}

export function getUniverseTypeInfoOrder(query) {
  return request({
    url: '/helper/markets/getUniverseTypeInfoOrder',
    method: 'get',
    params: query,
    headers:{
      isToken:false
    }
  })
}

export function marketPriceList(query) {
  return request({
    url: '/helper/markets/marketPriceList?dataSource='+query,
    method: 'get',
    headers:{
      isToken:false
    }
  })
}

