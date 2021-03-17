<template>
  <div>
    <el-form label-width="80px">
      <!-- 菜单名称 -->
      <el-form-item label="角色名称">
        <el-input v-model="data.rolename"></el-input>
      </el-form-item>
      <!-- 懒加载复选框 -->
      <el-form-item label="角色权限">
        <el-tree
          :data="menuList"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          ref="tree"
          :default-checked-keys="menusArr"
        ></el-tree>
      </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态">
        <el-switch
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="2"
          v-model="data.status"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="edit" v-if="this.$route.query.id">编辑</el-button>
        <el-button type="primary" @click="add" v-else>添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addRole, roleDetail ,editRole} from "../../../utils/request";
import { successAlert } from "../../../utils/alert";
export default {
  // 数据
  data() {
    return {
      menusArr: [],
      data: {
        rolename: "", //角色名称
        menus: "", //角色权限 id数组,'[2,3,4]'
        status: 1, //状态1正常2禁用
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    //
    ...mapGetters({
      menuList: "menu/menuList",
    }),
  },
  methods: {
    //   方法
    ...mapActions({
      // 获取菜单列表
      requestMenuList: "menu/menuListActions",
    }),
    // 添加
    add() {
      // console.log(this.data);
      // console.log(JSON.stringify(this.$refs.tree.getCheckedKeys()));
      this.data.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      addRole(this.data).then((res) => {
        //
        successAlert(res.data.msg);
        // console.log(res);
        this.$router.push("/index/role");
      });
    },
    // 编辑
    edit() {
        // 修改menusArr的类型

        // console.log(JSON.stringify(this.menusArr));
        // 获取树形结构数据getCheckedKeys()
        this.data.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        // console.log(this.data.menus);
        // console.log(this.menusArr);
        // console.log(this.data);
    //   console.log(typeof this.data.menus);

      editRole(this.data).then(res=>{
        successAlert(res.data.msg);
        this.$router.push("/index/role");
      })
    },
    // 取消
    cancel() {
      this.$router.push("/index/role");
    //   清空
    this.data = {
        rolename: "", //角色名称
        menus: "", //角色权限 id数组,'[2,3,4]'
        status: 1, //状态1正常2禁用
    }
    },
  },

  mounted() {
    this.requestMenuList(); 
    //   console.log(111);
    // console.log(this.$route);
    if (this.$route.query.id) {
      // 获取列表详细信息
      roleDetail({ id: this.$route.query.id }).then((res) => {
        this.menusArr = JSON.parse(res.data.list.menus);
        this.data= res.data.list;
        this.data.id = this.$route.query.id;
        // this.data.menus = menusArr;
      });
    }
  },
};
</script>

<style scoped>
.el-input,.el-tree{
  width:450px;
}
.el-tree{
  background-color: #E9EEF3;
}
</style>