<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="pid" label="分类编号" sortable width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180"></el-table-column>
      <el-table-column label="图片">
        <template v-slot="prop">
          <img :src="$preImg + prop.row.img" v-if="prop.row.img" />
        </template>
      </el-table-column>
      <!-- 状态 -->
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
import { cateDel } from "../../../utils/request";
import { successAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      tableData: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/cateListActions",
    }),
    // 编辑
    edit(id){
        this.$router.push('/index/addCate?id=' + id);
    },
    // 删除
    del(id) {
      //  console.log(uid);
      this.$confirm("确定删除该列表吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除请求
          cateDel({ id }).then((res) => {
            // console.log(res);
            successAlert(res.data.msg);
            this.requestCateList();
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
    // 发起请求
    this.requestCateList();
    //
  },
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>