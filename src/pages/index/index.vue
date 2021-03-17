<template>
  <div>
    <el-container>
      <!-- 侧边栏导航 -->
      <el-aside width="200px">
        <el-menu
          default-active="/index"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 判断是否有子级 -->
          <template v-for="item in user.menus">
            <!-- 目录 -->
            <el-submenu :index="item.title" :key="item.id" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <!-- 有目录的菜单 -->
              <el-menu-item :index="'/index/'+ i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
            </el-submenu>
            <!-- 没有子级，只要菜单 -->
              <el-menu-item :key="item.id" :index="'/index/' + item.url" v-else>{{item.title}}</el-menu-item>
            </template>

        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header height="80px">
          {{user.username}}
          <i class="el-icon-setting" @click="exit"></i>
        </el-header>
        <!-- 主体 -->
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
          <!--  -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    // 退出
    exit() {
      this.$router.push("/login");
      // 清空数据
      this.requestUserInfo();
    },
    ...mapActions({
      requestUserInfo: "userInfoActions",
    }),
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {
    //
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: right;
  line-height: 80px;
}

.el-aside {
  background-color: #20222a;
  color: #333;
  text-align: center;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-menu-item {
  background-color: #20222a;
}
.el-breadcrumb {
  margin-bottom: 16px;
}
</style>