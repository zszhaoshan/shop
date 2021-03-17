<template>
  <div class="con">
    <div class="login">
      <h2>登录</h2>
      <el-input v-model="user.username" placeholder="请输入用户名" class="input"></el-input>
      <el-input type="password" v-model="user.password" placeholder="请输入密码" class="input"></el-input>
      <el-row>
        <el-button type="primary" class="btn" @click="login">登录</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions} from 'vuex';
import { successAlert, warningAlert } from '../../utils/alert';
import {reqlogin} from '../../utils/request'
export default {
  data() {
    return {
      user:{
        username:'',
        password:''
      }
    };
  },
  methods:{
    ...mapActions({
      'requestUser':'userInfoActions'
    }),
    // 登录
      login(){
        // sessionStorage数据存储
        if(this.user.username !== '' || this.user.password !== ''){
          // 进行数据请求
          reqlogin(this.user).then(res=>{
            
            successAlert(res.data.msg);
            // 登录成功后将用户名和密码存入sessionSorage数据库中
            // 发起请求
            // console.log(res);
            this.requestUser(res.data.list);
            this.$router.push('/index');
          })
        }else{
          warningAlert('请输入用户名或密码！！')
        }



        // localStorage数据存储
          // console.log(this.user);
          // 如果用户名或者密码都不为空，进行数据请求
          // if(this.user.username !== '' || this.user.password !== ''){
          //   login(this.user).then(res=>{
          //     successAlert(res.data.msg);
          //     // 如果本地存储中有值，则将它移除
          //     if(localStorage.getItem('user') !== null){
          //       localStorage.removeItem('user')
          //     }
          //     // 如果没有值，登录成功后，将用户名和密码存入LocalStorage
          //     localStorage.setItem('user',JSON.stringify(res.data.list));
          //     this.$router.push('/index');
          //   })
          // }else{
          //   warningAlert('请输入用户名或密码！！')
          // }
      }
  },
  mouted(){
  }
};
</script>

<style scoped>
.con {
  width:100vw;
  height: 100vh;
  position:fixed;
  top:0;
  left:0;
  background-color: rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  margin: 20px;
}
.input {
  margin-bottom: 16px;
}
.login {
  width: 400px;
  height: 300px;
  background-color: #fff;
  padding: 0 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform:translate(-50%,-70%);
}
.btn {
  width: 100%;
}
</style>