import request from '@/utils/request'

// 分解蓝图
export function listArticleWarehouse(query) {
  return request({
    url: '/system/blueprintDecomposition/',
    method: 'get',
    params: query
  })
}
