<template>
  <div>
    <!-- :model="info" -->
    <el-form label-width="80px" :model="info">
      <!-- 所属角色 -->
      <el-form-item label="所属角色">
        <el-select placeholder="===请选择===" v-model="info.roleid">
          <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 用户名 -->
      <el-form-item label="用户名">
        <el-input v-model="info.username"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码">
        <el-input v-model="info.password" type="password"></el-input>
      </el-form-item>
      
       <!-- 状态 -->
      <el-form-item label="状态">
        <el-switch
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="2"
          v-model="info.status"
        ></el-switch>
      </el-form-item>
       <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" v-if="this.$route.query.uid" @click="edit">编辑</el-button>
        <el-button type="primary" @click="add" v-else>添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addManager,roleList,managerDetail,managerEidt} from '../../../utils/request';
import {successAlert} from '../../../utils/alert';
import {mapActions,mapGetters} from 'vuex';
export default {
  data(){
    return {
      info:{
        roleid:'',  //角色编号number
        username:'',  //管理员名称
        password:'',   //密码  string
        status:1  //状态  1正常2禁用
      }
    }
  },
  computed:{
    ...mapGetters({
      'roleList':'role/roleList'
    }),
  },
  // 方法
  methods:{
    ...mapActions({
      'requestRoleList':'role/roleListActions'
    }),
    // 添加
    add(){
      // console.log(this.info);
      addManager(this.info).then(res=>{
        // 
        successAlert(res.data.msg);
        // 刷新页面
        this.requestRoleList();
        this.$router.push('/index/manager');
      });
    },
    edit(){
      console.log(this.info);
      managerEidt(this.info).then(res=>{
        successAlert(res.data.msg);
        this.$router.push('/index/manager');
      })
    },
   

    // 取消
    cancel(){
      this.$router.push('/index/manager')
    }
  },
  mounted(){
    this.requestRoleList();
    // console.log(this.$route);
    if(this.$route.query.uid){
      // 获取管理员详情
      managerDetail({uid:this.$route.query.uid}).then(res=>{
        // console.log(res);
        this.info = res.data.list;
      })
    }
  }
};
</script>

<style scoped>
.el-input{
  width:450px;
}
</style>