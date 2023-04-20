import request from '@/utils/request'

// 查询物品列表
export function listArticle(query) {
  return request({
    url: '/article/articleList/articleList',
    method: 'get',
    params: query
  })
}

// 查询物品详细信息
export function getArticle(id) {
  return request({
    url: '/article/' + id,
    method: 'get'
  })
}

// 新增物品
export function addArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data: data
  })
}

// 修改物品
export function updateArticle(data) {
  return request({
    url: '/article',
    method: 'put',
    data: data
  })
}

// 删除物品
export function delArticle(id) {
  return request({
    url: '/article/' + id,
    method: 'delete'
  })
}

// 导出物品列表
export function exportArticle(query) {
  return request({
    url: '/article/export',
    method: 'get',
    params: query
  })
}

// 导出物品列表
export function BluePrintList() {
  return request({
    url: '/article/BluePrintList',
    method: 'get',
  })
}