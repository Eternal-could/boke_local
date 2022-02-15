<template>
  <div @click="GoArticleDetail">
    <el-card class="box-card" style="width: 64%; margin-left: 210px">
      <div slot="header" class="clearfix">
        <span>{{articleData.title}}</span>
        <el-tag type="warning" v-if="!articleData.approved">未审核</el-tag>
      </div>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-image
            :src="articleData.cover"
            style="width: 60%; margin-left: 36px"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <p>{{articleData.description}}</p>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="2">
          <el-avatar :src="articleData.author.avatar" size="small" style="margin-top: 14px"></el-avatar>
        </el-col>
        <el-col :span="6">
          <p>{{articleData.author.userName}}</p>
        </el-col>
        <el-col :span="4">
        <p>{{articleData.lastModified | transformTime}}</p>
      </el-col>
        <el-col :span="7" :offset="5" style="display: flex; justify-content: space-between; ">
          <el-badge :value="articleData.likes" class="item">
            <el-button size="small">喜欢</el-button>
          </el-badge>
          <el-badge :value="articleData.views" class="item" type="primary">
            <el-button size="small">阅览</el-button>
          </el-badge>
          <el-badge :value="articleData.comment.length" class="item" type="warning">
            <el-button size="small">回复</el-button>
          </el-badge>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import AuthorService from "@/service/AuthorService";
import defaultConfig from "@/config/config.default";
export default {
  name: "Global-Article",
  props: {
    articleData: {
      type: Object,
      default() {
        return {
          title: '',
          tags: [],
          description: '',
          cover: '',
          comment: [],
          author: {},
          lastModified: new Date(),
          views: 0,
          likes: 0,
          blogId: 1, // 博客id 一个递增字段，用于表示一个独一无二的博客文章数据
          approved: true
        }
      }
    }
  },
  filters: {
    transformTime(time) {
      let blogCreateTime = new Date(time); // 获取博客发布的时间
      let currentTime = new Date(); // 当前时间
      let offsetTime = currentTime - blogCreateTime; // 时间差 单位是毫秒
      let offsetST = offsetTime / 1000; // 转成s
      let offsetMT = offsetST / 60; // min
      let offsetHT = offsetMT / 60; //h
      let offsetDT = offsetHT / 24; //day
      if (offsetDT >= 365) {
        return `发表于${Math.floor(offsetDT / 365)}年之前`;
      } else if (offsetDT >= 30 && offsetDT < 365) {
        return `发表于${Math.floor(offsetDT / 30)}月之前`;
      } else if (offsetDT >= 7 && offsetDT < 30) {
        return `发表于${Math.floor(offsetDT / 7)}周之前`;
      } else if (offsetDT >= 1 && offsetDT < 7) {
        return `发表于${Math.floor(offsetDT)}天之前`;
      } else if (offsetHT >= 1) {
        return `发表于${Math.floor(offsetHT)}小时之前`;
      } else if (offsetMT >= 1) {
        return `发表于${Math.floor(offsetMT)}分钟之前`;
      } else if (offsetST >= 1) {
        return `发表于${Math.floor(offsetST)}秒之前`;
      }
    }
  },
  methods: {
    GoArticleDetail() {
      AuthorService.checkPermission().then(rs=>{
        if (rs.data.status === 200) {
          this.$router.push(`/article/${this.articleData.blogId}`);
        } else {
          window.location.replace(`${defaultConfig.hostname}/login.html`);
        }
      })
    }
  }
}
</script>

<style scoped>

</style>