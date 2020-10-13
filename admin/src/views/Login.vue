<template>
  <div class="login-container">
    <el-card header="请先登录" class="login_card">
      <el-form @submit.native.prevent="login"  >
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-button type='primary' native-type="submit">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
      },
    }
  },
  methods: {
    async login() {
     if(!this.model.username || !this.model.password){
       this.$message.error('账号或密码不能为空')
       return
     }
     const res = await this.$http.post('login', this.model)
     console.log(res);
     localStorage.token = res.data.token
     this.$router.push('/')
     this.$message.success('登录成功')

    }
  },
  
}
</script>

<style scoped>
.login_card {
  width: 25rem;
  margin: 5rem auto;
}
</style>