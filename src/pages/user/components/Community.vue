<template>
  <div>
    <GlobalArticle
      v-for="(blogItem, index) of blogList"
      :article-data="blogItem"
      :key="index"
    ></GlobalArticle>
    <el-pagination
      :hide-on-single-page="true"
      layout="prev, pager, next"
      :page-size="params.limit"
      :total="totalNum"
      @current-change="changePage"
      style="margin-left: 210px"
    ></el-pagination>
    <div class="copy">
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="blank">黑ICP备19006802号</a>
      <div>Copyright &copy; 2022 All Rights Reserved. Copyright By LeiYongJiu</div>
    </div>
  </div>
</template>

<script>
import GlobalArticle from "@/components/Global-Article";
import BlogService from "@/service/BlogService";
export default {
  name: "Community",
  components:{
    GlobalArticle
  },
  data(){
    return {
      blogList:[],
      params: {
        limit: 2,
        offset: 0
      },
      totalNum: 0
    }
  },
  created() {
    this.getBlogData();
  },
  methods:{
    getBlogData() {
      BlogService.getPublicBlog(this.params).then(rs=>{
        // console.log('博客数据',rs.data.data);
        this.totalNum = rs.data.data.totalNum;
        this.blogList = rs.data.data.blogList;
      })
    },
    changePage(page) {
      this.params.offset = (page - 1) * this.params.limit;
      this.getBlogData();
    }
  }
}
</script>

<style scoped>
.copy {
  text-align: center;
}
.copy a{
  text-decoration: none;
  color: black;
}
.copy a:hover{
  color: #7710ce;
}
</style>