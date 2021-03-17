<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list></v-list>
  </div>
</template>

<script>
import vList from './components/list';
export default {
  methods: {
    // 添加角色
    add() {
      this.$router.push("/index/addRole");
    },
  },
  components:{
    vList
  }
};
</script>

<style scoped>
.el-button{
  margin-bottom: 16px;
}
</style>