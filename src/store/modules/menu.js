import {menuList} from '../../utils/request';
// 初始化数据
const state = {
  menuList:[]
};
// 操作数据
const mutations = {
  changeMenuList(state,arr){
    state.menuList = arr;
  }
};
// 操作方法
const actions = {
  menuListActions(context){
    // axios请求
    menuList({istree:true}).then(res=>{
      // console.log('========');
      // console.log(res);
      // console.log('========');
      context.commit('changeMenuList',res.data.list);
    })
  }
};
// 
const getters = {
  menuList(state){
    return state.menuList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true,
}



