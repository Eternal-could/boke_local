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
                src="https://avatars.githubusercontent.com/u/74654896?s=400&u=e702413f7bda117586b25af383579f33faa7247e&v=4"
                title="落花成语"
                fit="contain"
            >
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>落花成语</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item>登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link type="primary" href="login.html">登录</el-link>
          <el-button type="text" icon="el-icon-s-home">小树洞</el-button>
          <el-button type="text" icon="el-icon-edit">写文章</el-button>
          <el-button type="text" icon="el-icon-s-data">站点管理系统</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="300px">
        侧边栏
      </el-aside>
      <el-main>
        主内容区
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AuthorService from "@/service/AuthorService";
export default {
  name: "Home",
  data() {
    return {
      searchStr:''
    }
  },
  created() {
    AuthorService.checkPermission().then(rs=>{
      if (rs.data.status === 200) {
        //stay here
      } else {
        // no
        window.location.replace('http://localhost:8080/login.html');
      }
    })
  }
}
</script>

<style scoped>

</style>