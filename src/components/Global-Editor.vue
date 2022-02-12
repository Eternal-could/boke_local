<template>
  <el-card class="box-card" v-loading="isPublishing" style="margin-top: 8px">
    <div slot="header" class="clearfix">
      <span>写文章</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="publishBlog">发布</el-button>
    </div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-upload
            class="avatar-uploader"
            :action="`${defaultConfig.baseApiUrl}/uploadImg`"
            name="blogIllustrations"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="cover" :src="cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon">封面</i>
        </el-upload>
      </el-col>
      <el-col :span="18">
        <el-row :gutter="10" style="margin-bottom: 20px">
          <el-col :span="24">
            <el-input v-model="title" placeholder="请输入文章标题"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-bottom: 20px">
          <el-col :span="24">
            <el-input v-model="description" placeholder="请输入文章简介"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-tag
                :key="tag"
                v-for="tag in tags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24">
        <div id="editor" ref="editor"></div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import defaultConfig from "@/config/config.default";
import Editor from "wangeditor";
import hljs from "highlight.js"
import ImgFileService from "@/service/imgFileService";
import BlogService from "@/service/BlogService";
export default {
  name: "Global-Editor",
  data() {
    return {
      defaultConfig,
      title: '',
      description: '',
      tags: [],
      cover: '',
      inputVisible: false,
      inputValue: '',
      editor: null,
      isPublishing: false
    }
  },
  mounted() {
    this.editor = new Editor(this.$refs.editor); // 初始化编辑器实例
    this.editor.highlight = hljs; // 实现代码编辑器的代码高亮

    // 编辑器的基本尺寸，聚焦，占位符的基本配置
    this.editor.config.height = 600;
    this.editor.config.weight = 1000;
    this.editor.config.placeholder = '请输入文章内容'
    this.editor.config.focus = true

    // 字体颜色， 背景色的预设值
    this.editor.config.colors = [
        '#000000', '#eeece0', '#1c487f', '#4d80bf', '#FFB6C1', '#FFC0CB',
        '#DC143C', '#DB7093', '#FF69B4', '#FF1493', '#C71585', '#DA70D6',
        '#D8BFD8', '#DDA0DD', '#EE82EE', '#FF00FF', '#FF00FF', '#8B008B',
        '#800080', '#BA55D3', '#9400D3', '#9932CC', '#4B0082', '#8A2BE2',
        '#9370DB', '#7B68EE', '#6A5ACD', '#483D8B', '#E6E6FA', '#F8F8FF',
        '#0000FF', '#0000CD', '#191970', '#00008B', '#000080', '#4169E1',
        '#AFEEEE', '#00FFFF', '#00FF7F', '#00FF00', '#FFFF00', '#FFFFE0',
        '#FFD700', '#FFA500', '#FFE4C4', '#FF8C00', '#D2691E', '#A0522D',
        '#FF4500', '#FF6347', '#FFE4E1', '#F08080', '#FF0000', '#800000'
    ]

    // 字号预设值
    this.editor.config.fontSize = {
      'x-small': { name: '10px', value: '1' },
      'small': { name: '13px', value: '2' },
      'normal': { name: '16px', value: '3' },
      'large': { name: '18px', value: '4' },
      'x-large': { name: '24px', value: '5' },
      'xx-large': { name: '32px', value: '6' },
      'xxx-large': { name: '48px', value: '7' },
    }

    // 行高
    this.editor.config.lineHeights = ['1', '1.15', '1.6', '2', '2.5', '3']

    // 插入本地图片
    this.editor.config.uploadImgMaxSize = 2 * 1024 *1024; //单位是字节 上传图片尺寸的限制
    this.editor.config.uploadImgMaxLength = 9; // 上传图片限制多少张
    this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
      // resultFiles 相当于input type = file 所选中的目标
      // insertImgFn 回调函数， 获取图片的最终地址， 插入到编辑器中
      let imgData = new FormData();
      for (let i = 0, len = resultFiles.length; i < len; i++) {
        imgData.append('blogIllustrations',resultFiles[i]);
      }
      ImgFileService.uploadImgFile(imgData).then(rs=>{
        for (let i = 0, len = rs.data.data.imgList.length; i < len; i++) {
          insertImgFn(rs.data.data.imgList[i])
        }
      })
    }

    // 粘贴文本的内容处理
    this.editor.config.pasteTextHandle = function (pasteStr) {
      console.log(pasteStr); // 只保留纯文档文档
      return '解析过后的str'
    }
    this.editor.create(); // 把实例变成元素内容
  },
  methods: {
    handleAvatarSuccess(rs) {
      console.log('头像上传成功',rs.data.imgList[0]);
      this.cover = rs.data.imgList[0];
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag),1);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    showInput() {
      this.inputVisible = true;
    },
    publishBlog() {
      let blogData = {
        title: this.title,
        description: this.description,
        tags: this.tags,
        cover: this.cover,
        content: this.editor.txt.html()
      }
      // loading ...
      this.isPublishing = true;
      // 数据校验 不通过不发布
      if (this.title && this.description && this.tags.length && this.cover && blogData.content) {
        BlogService.createBlog(blogData).then(rs=>{
          if (rs.data.status === 200) {
            this.$message.success('发布成功');
            this.$emit('publishSuccess');
          } else {
            this.$message.error('发布失败');
          }
        }).finally(()=>{
          // loading ...
          this.isPublishing = false;
        })
      } else {
        this.$message.warning('博客数据不全，请完善后再发布');
        this.isPublishing = false;
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    }
  },
  beforeDestroy() {
    this.editor.destroy(); // 销毁编辑器， 当用户离开这个组件的时候
  }
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
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