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
    add() {
      this.$router.push("/index/addCate"); //页面跳转
    },
  },
  components:{
    vList
  }
};
</script>

<style>
</style>