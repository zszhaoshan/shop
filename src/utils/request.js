import axios from 'axios';
import qs from 'qs';
import {
  errorAlert
} from './alert';
import store from '../store/index'

// 设置基础路径
const baseUrl = '/api';

// 设置请求头
axios.interceptors.request.use(res => {
  console.log('===请求拦截===');
  console.log('本次请求的路径为：' + res.url);
  console.log(res);
  console.log('===请求拦截结束===');
  if (res.url !== baseUrl + '/api/userlogin') {
    // 需要设置请求头
    res.headers.authorization = store.state.user.token
  }
  //   console.log(res);
  return res
});

// 设置拦截响应器
axios.interceptors.response.use(res => {
  console.log('===响应拦截===');
  console.log('本次响应路径为:' + res.config.url);
  console.log(res)
  console.log('===请求拦截结束===');
  // console.log(res.data.code);
  if (res.data.code !== 200) {
    // if(res.data.code == 500){
    //     errorAlert(res.data.msg);
    //     return;
    // }
    errorAlert(res.data.msg);
    return;
  }
  return res;
});

// 添加菜单
export const addMenu = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menuadd',
    data: qs.stringify(data)
  });
};

// 菜单列表
export const menuList = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/menulist',
    params
  });
};

// 菜单详情
export const menuDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/menuinfo',
    params
  });
};

// 菜单修改
export const editMenu = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menuedit',
    data: qs.stringify(data)
  });
};

// 菜单删除
export const delMenu = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menudelete',
    data: qs.stringify(data)
  });
};

// 添加角色
export const addRole = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roleadd',
    data: qs.stringify(data)
  });
};

// 角色列表
export const roleList = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/rolelist',
    params
  })
};

// 角色详情
export const roleDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/roleinfo',
    params
  })
};

// 角色修改
export const editRole = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roleedit',
    data: qs.stringify(data)
  });
};

// 删除角色列表
export const delRole = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roledelete',
    data: qs.stringify(data)
  });
};

// 添加管理员
export const addManager = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/useradd',
    data: qs.stringify(data)
  });
};

// 管理员列表总数
export const managerListCount = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/usercount',
    params
  });
};
// 管理员列表分页
export const managerListPage = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/userlist',
    params
  });
};

// 管理员详情
export const managerDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/userinfo',
    params
  });
};

// 管理员修改
export const managerEidt = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/useredit',
    data: qs.stringify(data)
  });
};

// 管理员删除
export const managerDel = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/userdelete',
    data: qs.stringify(data)
  });
};

// 管理员登录
export const reqlogin = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/userlogin',
    data: qs.stringify(data)
  });
};

// 商品分类添加
export const cateAdd = (data) =>{
  // 处理图片文件信息
  var form = new FormData();
  for(let i in data){
    form.append(i,data[i]);
  }
  return axios({
    method:'post',
    url:baseUrl + '/api/cateadd',
    data:form
  });
}

// 商品分类列表
export const cateList=(params)=>{
  return axios({
    method:'get',
    url:baseUrl + '/api/catelist',
    params
  });
}

// 商品分类详情
export const cateDetail = (params)=>{
  return axios({
    method:'get',
    url:baseUrl + '/api/cateinfo',
    params
  });
}

// 商品分类修改
export const editCate = (params)=>{
  return axios({
    method:'post',
    url:baseUrl + '/api/cateedit',
    params
  });
}

// 商品分类删除
export const cateDel =(data)=>{
  return axios({
    method:'post',
    url:baseUrl + '/api/catedelete',
    data:qs.stringify(data)
  });
}