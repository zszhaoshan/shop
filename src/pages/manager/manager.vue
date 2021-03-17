<template>
  <div>
      <el-button type="primary" @click="add">添加</el-button>
      <v-list></v-list>
  </div>
</template>

<script>
import vList from './components/list';
export default {
    // 方法
    methods:{
        // 添加
        add(){
            // 页面跳转
            this.$router.push('/index/addManager');
        }
    },
    components:{
        vList,
    }

}
</script>

<style scoped>
.el-button{
  margin-bottom: 16px;
}
</style>