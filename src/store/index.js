// 配置vuex状态管理
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 引入mutations、actions
import {state,mutations,getters} from './mutations';
import actions from './actions';
import menu from './modules/menu'; //菜单
import role from './modules/role'; //角色
import manager from './modules/manager'; //管理员
import cate from './modules/cate';

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        // 子模块
        menu,  
        role,
        manager,
        cate
    }
    
});

export default store;