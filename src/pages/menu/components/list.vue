<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180"></el-table-column>
      <el-table-column prop="icon" label="菜单图标"></el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" props>
        <template v-slot="props">
          <el-button type="primary" @click="edit(props.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(props.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delMenu } from "../../../utils/request";
export default {
  data() {
    return {
      //
    };
  },
  //
  computed: {
    ...mapGetters({
      tableData: "menu/menuList",
    }),
  },
  // 方法
  methods: {
    //获取菜单列表
    ...mapActions({
      requestMenuList: "menu/menuListActions",
    }),
    // 编辑
    edit(id) {
      // console.log(id);
      this.$router.push("/index/add?id=" + id);
    },
    // 删除
    del(id) {
      // console.log(id);
      this.$confirm("确定删除该列表吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除请求
          delMenu({ id }).then((res) => {
            // console.log(id);
            // console.log(res);
            this.$message(
              {
                type: "success",
                message: "删除成功！",
              },
              this.requestMenuList()
            );
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！",
          });
        });
    },
  },
  mounted() {
    this.requestMenuList();
  },
};
</script>

<style scoped>
</style>