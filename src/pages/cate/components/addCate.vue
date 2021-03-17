<template>
  <div>
    <!-- :model="info" -->
    <el-form label-width="80px" :v-model="info">
      <!-- 上级分类 -->
      <el-form-item label="上级分类">
        <el-select placeholder="===请选择===" v-model="info.pid">
          <el-option label="===请选择===" disabled value></el-option>
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 分类名称 -->
      <el-form-item label="分类名称">
        <el-input v-model="info.catename"></el-input>
      </el-form-item>
      <!-- 图片 -->
      <el-form-item label="图片">
        <div class="img-box">
          <img v-if="imgUrl" :src="imgUrl" alt />
          <span>+</span>
          <input type="file" @change="selectImg" />
        </div>
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
        <el-button type="primary" v-if="this.$route.query.uid">编辑</el-button>
        <el-button type="primary" v-else @click="add">添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { cateAdd ,cateDetail} from "../../../utils/request";
export default {
  data() {
    return {
      imgUrl: "",
      info: {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态    1正常2禁用
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/cateListActions",
    }),
    // 选择图片
    selectImg(e) {
      // console.log(e);
      // 获取图片文件信息
      var file = e.target.files[0];
      // 设置图片大小
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("上传图片大小大于2M！！");
        return;
      }

      // 设置图片后缀
      var suffix = [".gif", ".jpg", ".jpeg", ".png"];
      // 获取上传图片后缀
      var fix = file.name.slice(file.name.lastIndexOf("."));
      // 遍历所有后缀，判断上传图片格式是否为规定格式之一
      if (!suffix.some((item) => item == fix)) {
        warningAlert("上传图片格式不正确！！");
        return;
      }

      this.imgUrl = URL.createObjectURL(file);
      this.info.img = file;
    },
    // 添加
    add() {
      cateAdd(this.info).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
      });
    },
    // 取消
    cancel() {
      this.$router.push("/index/cate");
      this.info = {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态    1正常2禁用
      };
    },
  },
  mounted() {
    this.requestCateList();
    // console.log(this.$route.query.id);
    if(this.$route.query.id){
      // 获取商品详情
      cateDetail({id:this.$route.query.id}).then(res=>{
        // console.log(res);
        this.info = res.data.list;
        this.imgUrl = this.$preImg + this.info.img;
      });
    }
  },
};
</script>

<style scoped>
.el-input {
  width: 450px;
}
.img-box {
  width: 200px;
  height: 200px;
  border: 1px dashed grey;
  position: relative;
  text-align: center;
  line-height: 200px;
}
.img-box span {
  display: block;
  widows: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 26px;
}
.img-box input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
img {
  width: 200px;
  height: 200px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>