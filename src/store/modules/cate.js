import { cateList } from "../../utils/request";

const state ={
    // 初始化数据
    cateList:[]
}
const mutations ={
    changeCateList(state,arr){
        state.cateList = arr;
    }
}
const actions ={
    cateListActions(context){
        // 发起axios请求
        cateList({istree:true}).then(res=>{
            // console.log(res);
            context.commit('changeCateList',res.data.list)
        })
    }
}
const getters ={
    cateList(state){
        return state.cateList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}