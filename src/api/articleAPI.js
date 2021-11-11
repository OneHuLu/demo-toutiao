import request from '@/utils/request.js'
// const articlesPromise = request.get('/articles', {
//   params: {
//     _page: 1,
//     _limit: 10
//   }
// })
// export default articlesPromise
// 利用按需导出的方法
export const getArticlesListApi = function (_page, _limit) {
  return request.get('/articles', {
    params: {
      _page,
      _limit
    }
  })
}
