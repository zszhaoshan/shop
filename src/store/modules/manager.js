import {managerListCount,managerListPage} from '../../utils/request'
const state = {
    managerCount:0,
    managerPage:{
        size:3,
        page:1
    },
    managerList:[]
}
const mutations = {
    changeManagerList(state,arr){
        state.managerList = arr;
    },
    changeManagerCount(state,arr){
        state.managerCount = arr;
    },
    changePage(state,a){
        state.managerPage.page = a;
    }
}
const actions = {
    // 请求总数
    managerCountActions(context){
        // console.log(context);
        managerListCount().then(res=>{
            // console.log(res);
            context.commit('changeManagerCount',res.data.list[0].total);
        })
    },
    // 请求管理员列表
    managerListActions(context){
        // 
        managerListPage(context.state.managerPage).then(res=>{
            if(res.data.list == null || res.data.list.length == 0){
                // 页数减一
                var pg = context.state.managerPage.page - 1;
                context.commit('changePage',pg);
                // 自调
                context.dispatch('managerListActions');
                return 
            }
            // console.log(res);
            context.commit('changeManagerList',res.data.list);
        })
    },
    pageActions(context,p){
        context.commit('changePage',p);
    }

}
const getters = {
    // 总数
    managerCount(state){
        return state.managerCount;
    },
    // 分页
    managerPage(state){
        return state.managerPage;
    },
    managerList(state){
        return state.managerList;
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}