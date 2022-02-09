<template>
  <div style="width: 100vw;" class="box">
    <el-row
      :gutter="10"
      style="width: 100%; height: 100%;"
    >
      <el-col :span="10">
        <div class="layout">
          <div class="login-wrapper" v-if="isLogin">
            <h1 style="text-align: center">登录</h1>
            <el-form :model="loginForm" label-width="100px" ref="loginForm">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" show-password type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                <el-button type="danger" @click="resetForm('loginForm')">重置</el-button>
              </el-form-item>
            </el-form>
            <div style="text-align: right">
              没有账号，点击 <el-button type="primary" @click="switchStatus">注册</el-button>
              <br>
              <div class="copy">
                <a href="https://beian.miit.gov.cn/#/Integrated/index" target="blank">黑ICP备19006802号</a>
                <div>Copyright &copy; 2022 All Rights Reserved. Copyright By LeiYongJiu</div>
              </div>
            </div>
          </div>
          <div class="register-wrapper" v-else>
            <h1 style="text-align: center">注册</h1>
            <el-form ref="registerForm" :model="registerForm" label-width="100px">
              <el-form-item label="头像" prop="avatar" style="line-height: 10px">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    name="blogIllustrations"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                >
                  <img v-if="registerForm.avatar" :src="registerForm.avatar" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="registerForm.userName" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input show-password v-model="registerForm.password" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input show-password v-model="registerForm.confirmPassword" placeholder="请再次输入密码" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
                <el-button type="danger" @click="resetForm('registerForm')">重置</el-button>
              </el-form-item>
            </el-form>
            <div style="text-align: right">
              已有账号，点击 <el-button type="primary" @click="switchStatus">登录</el-button>
              <br>
              <div class="copy">
                <a href="https://beian.miit.gov.cn/#/Integrated/index" target="blank">黑ICP备19006802号</a>
                <div>Copyright &copy; 2022 All Rights Reserved. Copyright By LeiYongJiu</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="14" class="bg-video">
        <div class="wrap">
          <div class="form">
            <div class="right"><video src="./video/video.mp4" muted loop autoplay></video></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      isLogin: true,
      loginForm: {
        userName: '',
        password: ''
      },
      registerForm: {
        userName: '',
        password: '',
        confirmPassword:'',
        avatar:''
      }
    }
  },
  methods: {
    switchStatus() {
      this.isLogin = !this.isLogin
    },
    submitForm(formName) {
      if (formName === 'loginForm') {
        //
      } else {
        //
      }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();// 重置表单元素的字段
        this.registerForm.password = '';
    },
    handleAvatarSuccess(rs) {
      console.log('头像上传成功',rs);
      this.registerForm.avatar = rs.data[0];
    }
  },
}
</script>

<style scoped>
  body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1{
    color: beige;
  }

  a{
    text-decoration: none;
    color: white;
  }

  .copy {
    text-align: center;
    margin-top: 30px;
    color: white;
  }

  .login-wrapper, .register-wrapper {
    width: 80%;
    margin: auto;
  }

  .box {
    background-image: linear-gradient(to left top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  }

  .layout, .wrap {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form {
    width: 500px;
    height: 540px;
    display: flex;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
  }

  .right {
    width: 500px;
    height: 560px;
    margin-left: auto;
  }

  .right video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .footer {
    position: relative;
    top: 10px;
    left: -348px;
    width: 600px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px !important;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>