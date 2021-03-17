<template>
  <div>
    <!-- :data="data" -->
    <el-table
      style="width: 100%;margin-bottom: 20px;"
      :data="managerList"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop>
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="managerCount"
      :page-size="managerPage.size"
      :current-page="managerPage.page"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { managerDel } from "../../../utils/request";
import { successAlert } from "../../../utils/alert";
export default {
  //
  computed: {
    //
    ...mapGetters({
      managerCount: "manager/managerCount",
      managerPage: "manager/managerPage",
      managerList: "manager/managerList",
    }),
  },
  methods: {
    ...mapActions({
      requestManagerCount: "manager/managerCountActions", //总数
      requestManagerList: "manager/managerListActions", //列表
      //
      page: "manager/pageActions",
    }),
    changePage(page) {
      this.page(page);
      this.requestManagerList();
    },
    // 编辑
    edit(uid) {
      console.log(uid);
      // 获取数据
      //
      this.$router.push("/index/addManager?uid=" + uid);
    },
    // 删除
    del(uid) {
      //  console.log(uid);
      this.$confirm("确定删除该列表吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除请求
          managerDel({ uid }).then((res) => {
            // console.log(uid);
            // console.log(res);
            successAlert(res.data.msg);
            this.requestManagerCount(); //总数
            this.requestManagerList(); //列表
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
    this.requestManagerCount(); //总数
    this.requestManagerList(); //列表
  },
};
</script>

<style>
</style>