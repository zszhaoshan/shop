import {
  roleList
} from '../../utils/request';
// 初始化数据
const state = {
  roleList: [] //初始化数据
}
// 操作数据
const mutations = {
  changeRoleList(state, arr) {
    state.roleList = arr;
  }
}
// 操作方法
const actions = {
  roleListActions(context) {
    roleList().then(res => {
        context.commit('changeRoleList',res.data.list)
    });
  }
}
// 对接数据
const getters = {
  roleList(state) {
    return state.roleList;
  }

}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
