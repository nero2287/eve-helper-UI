import request from '@/utils/request'

// 查询系统仓库列表
export function listArticlewarehouse(query) {
  return request({
    url: '/system/articlewarehouse/list',
    method: 'get',
    params: query
  })
}

// 查询系统仓库详细
export function getArticlewarehouse(id) {
  return request({
    url: '/system/articlewarehouse/' + id,
    method: 'get'
  })
}

// 新增系统仓库
export function addArticlewarehouse(data) {
  return request({
    url: '/system/articlewarehouse',
    method: 'post',
    data: data
  })
}

// 修改系统仓库
export function updateArticlewarehouse(data) {
  return request({
    url: '/system/articlewarehouse',
    method: 'put',
    data: data
  })
}

// 删除系统仓库
export function delArticlewarehouse(id) {
  return request({
    url: '/system/articlewarehouse/' + id,
    method: 'delete'
  })
}

// 导出系统仓库
export function exportArticlewarehouse(query) {
  return request({
    url: '/system/articlewarehouse/export',
    method: 'get',
    params: query
  })
}