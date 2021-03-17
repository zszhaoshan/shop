<template>
  <div>
    <!-- :data="data" -->
    <el-table
      style="width: 100%;margin-bottom: 20px;"
      :data="data"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import {delRole} from '../../../utils/request'
export default {
  data() {
    return {};
  },
  computed:{
      ...mapGetters({
          'data':'role/roleList'
      })
  },
  methods: {
    //   方法
    ...mapActions({
      'requestRoleList': "role/roleListActions",
    }),
    // 编辑
    edit(id){
        // 页面跳转
        this.$router.push('/index/addRole?id=' + id);
    },
    // 删除
    del(id){
         console.log(id);
      this.$confirm("确定删除该列表吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除请求
          delRole({ id }).then((res) => {
            // console.log(id);
            // console.log(res);
            this.$message(
              {
                type: "success",
                message: "删除成功！",
              },
              this.requestRoleList()
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
    //   获取列表数据
    this.requestRoleList();
  },
};
</script>

<style>
</style>