import request from '@/utils/request'

export function cacheContractData(type) {
  return request({
    url: '/system/manage/cacheContractData?dataSource='+type,
    method: 'get',
  })
}

export function checkContractDataProgress() {
  return request({
    url: '/system/manage/checkContractDataProgress',
    method: 'get',
  })
}

// 查询部门列表
export function contractConditions(query) {
  return request({
    url: '/helper/contract/contractConditions',
    method: 'get',
    params: query,
    headers:{
      isToken:false
    }
  })
}