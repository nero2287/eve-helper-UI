import request from '@/utils/request'

export function cacheSerenityUniverseTypeInfo() {
  return request({
    url: '/system/manage/serenity/cacheSerenityUniverseTypeInfo',
    method: 'get'
  })
}

export function cacheTranquilityUniverseTypeInfo() {
  return request({
    url: '/system/manage/tranquility/cacheTranquilityUniverseTypeInfo',
    method: 'get'
  })
}

export function checkThreadTempData() {
  return request({
    url: '/system/manage/checkThreadTempData',
    method: 'get',
  })
}

export function searchUniverseTypeByTypeName(type_name,dataSource) {
  return request({
    url: '/helper/universe/searchUniverseTypeByTypeName?type_name='+type_name+'&dataSource='+dataSource,
    method: 'get',
    query:dataSource,
    headers:{
      isToken:false
    }
  })
}

export function cacheSerenityUniverseSystemInfo() {
  return request({
    url: '/system/manage/cacheSerenityUniverseSystemInfo',
    method: 'get',
  })
}

export function cacheTranquilityUniverseSystemInfo() {
  return request({
    url: '/system/manage/cacheTranquilityUniverseSystemInfo',
    method: 'get',
  })
}

export function cacheSerenityStationInfo() {
  return request({
    url: '/system/manage/cacheSerenityStationInfo',
    method: 'get',
  })
}

export function cacheTranquilityStationInfo() {
  return request({
    url: '/system/manage/cacheTranquilityStationInfo',
    method: 'get',
  })
}

export function cacheSerenityUniverseGroupInfo() {
  return request({
    url: '/system/manage/cacheSerenityUniverseGroupInfo',
    method: 'get',
  })
}

export function cacheTranquilityUniverseGroupInfo() {
  return request({
    url: '/system/manage/cacheTranquilityUniverseGroupInfo',
    method: 'get',
  })
}

export function blueprintCheck(universeGroupId,blueprintGroupId) {
  return request({
    url: '/system/manage/blueprintCheck?blueprint_group_id='+blueprintGroupId+'&market_group_id='+universeGroupId,
    method: 'get',
  })
}