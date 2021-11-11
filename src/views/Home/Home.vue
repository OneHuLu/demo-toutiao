<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <van-nav-bar title="黑马头条" fixed />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled='refreshFinish'>
      <!-- 导入， 注册， 并使用 ArticleInfo组件 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <Article
          v-for="item in articList"
          :key="item.id"
          :title="item.title"
          :author="item.aut_name"
          :count="item.comm_count"
          :pubdate="item.pubdate"
          :cover="item.cover"
        ></Article>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesListApi } from '@/api/articleAPI.js'
import Article from '@/components/Article/ArctileInfo.vue'
export default {
  name: 'Home',
  data () {
    return {
      page: 1,
      limit: 10,
      articList: [],
      list: [],
      // loading是否在加载下一页数据，loading 为 true ,不会反复触发load加载
      // 但是当每一页数据请求完成后，要将loading 的值改为 false
      loading: false,
      // 判断是否右更多的数据，如果没有间将 finished 的值改为 true
      finished: false,
      isLoading: false,
      refreshFinish: false
    }
  },
  components: {
    Article
  },
  methods: {
    // 封装获取文章数据
    async getInfoList (isRefresh) {
      const { data: res } = await getArticlesListApi(this.page, this.limit)
      // 判断是下拉刷新还是上拉加载
      if (isRefresh) {
        // 下拉刷新
        this.articList = [...res, ...this.articList]
        this.isLoading = false
      } else {
        // 上拉加载
        // 上拉加载更多
        // 实现合并数组
        // const arr = [...oldArr,...newArr]
        this.articList = [...this.articList, ...res]
        this.loading = false
      }
      if (res.length === 0) {
        this.finished = true
        this.refreshFinish = true
      }
    },
    // 只要onload被调用就触发了load事件
    onLoad () {
      // 页码数值加1
      this.page++
      // 调用请求函数
      this.getInfoList()
    },
    // 下拉刷新
    onRefresh () {
      // 页码加1
      this.page++
      this.getInfoList(true)
    }
  },
  created () {
    this.getInfoList()
  }
}
</script>

<style lang="less" spocked>
.home-container {
  padding-top: 46px;
  padding-bottom: 50px;
  .van-nav-bar__title {
    color: #fff;
  }
}
</style>
