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
            <el-input v-model="formLabelAlign.userPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
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
      if (result.success_code === 500) {
        // 进入页面
        // this.$router.push({
        //   name: 'About',
        //   params: {
        //     userName: result.message.userName,
        //     userPassword: result.message.userPassword
        //   }
        // })
      } else {
        alert(result.message || '未知错误🙅‍♂️')
      }
    }
  }
}
</script>

<style scoped lang="less">
  .home {
    margin-top: 200px;
    .logIn {
      width: 400px;
      height: 600px;
      margin: 0px auto;
    }
    .head {
      font-size: 40px;
      color: #0096e0;
      margin-bottom: 70px;
    }
    .body {
      width: 100%;
      height: 500px;
      el-form-item {
        margin-bottom: 60px;
      }
    }
  }
</style>
