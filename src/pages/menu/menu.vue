<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list></v-list>
  </div>
</template>

<script>
import vList from "./components/list.vue";

export default {
  data() {
    return {
    };
  },
  methods: {
    //   菜单添加
    add() { 
      // this.event.$emit('am',this.infos.isAdd);
      this.$router.push("/index/add");
      // this.infos.isAdd = true;
    },
     
  },
  components: {
    // 组件注册
    vList,
  },
};
</script>

<style scoped>
.el-button {
  margin-bottom: 16px;
}
</style>