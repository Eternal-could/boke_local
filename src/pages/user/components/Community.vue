<template>
  <div>
    <GlobalArticle></GlobalArticle>
    <el-pagination
      layout="prev, pager, next"
      :totalNum="50"
    ></el-pagination>
  </div>
</template>

<script>
import GlobalArticle from "@/components/Global-Article";
export default {
  name: "Community",
  components:{
    GlobalArticle
  },
  data(){
    return {
      blogList:[],
      params: {
        limit: 3,
        offset: 0
      },
      totalNum: 0
    }
  },
  methods:{
    getBlogData() {

    }
  }
}
</script>

<style scoped>

</style>