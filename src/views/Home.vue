<template>
  <div class="home">
    <div class="logIn">
      <div class="head">多多设备后台管理系统</div>
      <div class="body">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="用户名:">
            <el-input v-model="formLabelAlign.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码:">
            <!-- @keyup.enter.native属性，监听键盘的enter按键 -->
            <el-input type="password" v-model="formLabelAlign.userPassword" @keyup.enter.native="submitForm()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- <form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data" style="z-index:100;baciground-color:pink;position:fixed;left:0;top:0;">
        <h2>单图上传</h2>
        <input type="file" name="logo">
        <textarea placeholder="placeholder" name="textContent" />
        <input type="submit" value="提交">
    </form> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { logIn } from './../api/index'
export default {
  name: 'Home',
  components: {},
  data: function () {
    const item = {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }
    return {
      visible: false,
      tableData: Array(20).fill(item),
      labelPosition: 'right',
      formLabelAlign: {
        userName: '',
        userPassword: ''
      }
    }
  },
  methods: {
    async submitForm () {
      const result = await logIn(this.formLabelAlign.userName, this.formLabelAlign.userPassword)
      console.log('================')
      console.log(result)
      console.log('================')
      if (result.code === 200) {
        this.$message({
          message: result.message,
          type: 'success'
        })
        // 进入页面
        this.$router.push({
          name: 'About',
          params: {
            userName: result.message.userName,
            userPassword: result.message.userPassword
          }
        })
      } else {
        this.$message.error(result.message)
      }
    }
    // // clickClick
    //   clickClick (url = 'https://api.itooi.cn/music/tencent/search?key=579621905&s=东风破&limit=100&offset=0&type=song', params = {}, "GET") {
    //       // 定义promis对象
    //       let promise
    //       return new Promise((resolve, reject) => {
    //         // 判断请求的方式
    //         if (type === 'GET') {
    //           // 拼接请求字符串
    //           let paramStr = ''
    //           Object.keys(params).forEach((key) => {
    //             paramStr += key + '=' + params[key] + '&'
    //           })

    //           // 过滤最后的&
    //           if (paramStr !== '') {
    //             paramStr = paramStr.substr(0, paramStr.lastIndexOf('&'))
    //           }

    //           // 完整的路径
    //           url += '?' + paramStr

    //           // 发送get请求
    //           promise = axios.get(url)
    //         } else if (type === 'POST') {
    //           promise = axios.post(url, params)
    //         }

    //         // 返回请求结果
    //         promise.then((respose) => {
    //           resolve(respose.data)
    //         }).catch(error => {
    //           reject(error)
    //         })
    //       })
    //   }
  }
}
</script>

<style scoped lang="less">
  .home {
    width: 100%;
    height: 726px;
    position: relative;
    .logIn {
      width: 400px;
      height: 600px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .head {
      font-size: 40px;
      color: #0096e0;
      margin-bottom: 70px;
    }
    .body {
      width: 100%;
      height: 214px;
      el-form-item {
        margin-bottom: 60px;
      }
    }
  }
</style>
