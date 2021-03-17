<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/menu' }">菜单列表</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$route.name}}</el-breadcrumb-item>
    </el-breadcrumb>-->
    <el-form label-width="80px" :model="info">
      <!-- 菜单名称 -->
      <el-form-item label="菜单名称">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <!-- 上级菜单 -->
      <el-form-item label="上级菜单">
        <el-select placeholder="===请选择===" v-model="info.pid">
          <el-option label="===请选择===" value disabled></el-option>
          <el-option label="顶级菜单" :value="0"></el-option>
          <!-- 遍历菜单列表 -->
          <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!--菜单类型  -->
      <el-form-item label="菜单类型">
        <el-radio :label="1" v-model="info.type">目录</el-radio>
        <el-radio :label="2" v-model="info.type">菜单</el-radio>
      </el-form-item>
      <!-- 菜单图标 -->
      <el-form-item label="菜单图标" v-if="info.type == 1">
        <el-select placeholder="===请选择===" v-model="info.icon">
          <el-option label="===请选择===" value disabled></el-option>
          <el-option :label="item" v-for="item in icons" :key="item" :value="item">
            <i :class="item"></i>
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 菜单地址 -->
      <el-form-item label="菜单地址" v-else>
        <el-select placeholder="===请选择===" v-model="info.url">
          <el-option label="===请选择===" value disabled></el-option>
          <el-option :label="item" :value="item" v-for="item in urls" :key="item"></el-option>
        </el-select>
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
        <el-button type="primary" v-if="this.$route.query.id" @click="edit()">编辑</el-button>
        <el-button type="primary" @click="add" v-else>添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../utils/alert";
import { addMenu, menuDetail, editMenu} from "../../../utils/request";

export default {
  data() {
    return {
      info: {
        pid: 0, //上级分类编号  注意：顶级菜单-0
        title: "", //菜单名称
        type: 1, //1：目录  2：菜单
        status: 1, //1：正常  2：禁用
        icon: "",
        url: "",
      },
      icons: [
        "el-icon-eleme",
        "el-icon-setting",
        "el-icon-s-cooperation",
        "el-icon-s-open",
        "el-icon-s-opportunity",
        "el-icon-video-pause",
      ],
      urls: ["menu", "role", "manager",'cate','spec','member','banner','seckill'],
    };
  },
  // 方法
  methods: {
    // 取消
    cancel() {
      // 页面跳转
      this.$router.push("/index/menu");
      // 清空数据
      this.info = {
        pid: 0, //上级分类编号  注意：顶级菜单-0
        title: "", //菜单名称
        type: 1, //1：目录  2：菜单
        status: 1, //1：正常  2：禁用
        icon: "",
        url: "",
      };
    },
    // 添加菜单
    add() {
      // console.log(this.info);
      addMenu(this.info).then((res) => {
        // console.log(res);
        successAlert(res.data.msg);
      });
      // 页面跳转
      this.cancel();
    },
    // 编辑提交按钮
    edit() {
      this.info.id = this.$route.query.id;
      // console.log(this.info);
      if (this.info.type == 2) {
        this.info.icon = "";
      } else {
        this.info.url = "";
      }
      // 提交数据
      editMenu(this.info).then((res) => {
        // console.log(111);
        // console.log(res);
        successAlert(res.data.msg);
        // 返回菜单列表页
        this.$router.push('/index/menu');
      });
    },
  },
  computed: {
    ...mapGetters({
      list: "menu/menuList",
    }),
  },
  mounted() {
    // 通过id获取对应的菜单列表的值
    if (this.$route.query.id) {
      menuDetail({ id: this.$route.query.id }).then((res) => {
        successAlert(res.data.msg);
        this.info = res.data.list;
      });
    };
  },
  
};
</script>

<style scoped>
.el-input{
  width:450px;
}
</style>