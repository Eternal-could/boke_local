<template>
  <el-container>
    <el-header
      style="border-bottom: 1px solid #ccc; padding: 10px 0; margin-bottom: 20px"
    >
      <el-row :gutter="10">
        <el-col
            :offset="3"
            :span="18"
            style="display: flex; align-items: center; justify-content: space-between"
        >
          <img src="@/assets/logo.png" alt="logo" style="height: 30px">
          <el-input
              v-model="searchStr"
              placeholder="请输入博客的标题"
              style="width: 60%"
          >
            <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-dropdown>
            <el-avatar
                :src="userData.avatar"
                :title="userData.userName"
                fit="contain"
            >
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>{{userData.userName}}</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item>登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link type="primary" href="login.html" v-if="!hasPermission">登录</el-link>
          <el-button type="text" icon="el-icon-s-home" v-if="hasPermission">小树洞</el-button>
          <el-button type="text" icon="el-icon-edit" v-if="hasPermission" @click="goEditArticle">写文章</el-button>
          <el-button type="text" icon="el-icon-s-data" v-if="isAdmin">站点管理系统</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="300px" v-if="hasPermission">
        <UserInfo :user-data="userData"></UserInfo>
      </el-aside>
      <el-main>
        <el-tabs v-model="activeName" @tab-click="switchTab">
          <el-tab-pane label="广场" name="article"></el-tab-pane>
          <el-tab-pane label="喜欢" name="like"></el-tab-pane>
          <el-tab-pane label="评论" name="comment"></el-tab-pane>
          <el-tab-pane label="关注" name="attention"></el-tab-pane>
          <el-tab-pane label="黑名单" name="blacklist"></el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AuthorService from "@/service/AuthorService";
import UserInfo from "@/pages/user/components/UserInfo";
export default {
  name: "Home",
  components: {
    UserInfo
  },
  data() {
    return {
      searchStr:'',
      hasPermission: false,
      isAdmin: false,
      userData : {},
      activeName: ''
    }
  },
  created() {
    AuthorService.checkPermission().then(rs=>{
      if (rs.data.status === 200) {
        //stay here
        this.hasPermission = true;
        this.userData = rs.data.data.userData;
        this.isAdmin = this.userData.isAdmin;
        sessionStorage.removeItem('userData');
        sessionStorage.setItem('userData', JSON.stringify(this.userData));
      } else {
        // no
        // window.location.replace('http://localhost:8080/login.html');
      }
    })
    this.activeName = this.$route.params.module? this.$route.params.module:'article'
  },
  methods: {
    goEditArticle() {
      this.$router.push('/editArticle')
    },
    switchTab(tab) {
      this.$router.push(`/home/${tab.name}`)
    }
  }
}
</script>

<style scoped>

</style>