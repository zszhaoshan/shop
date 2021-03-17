import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 登录
const login = () => import('../pages/login/login');
const index = () => import('../pages/index/index');
const home = () => import('../pages/home/home');
const menu = () => import('../pages/menu/menu');  //菜单
const add = () => import('../pages/menu/components/add');  //菜单添加
const role = () => import('../pages/role/role');  //角色
const addRole = () => import('../pages/role/components/addRole');  //角色添加
const manager = () => import('../pages/manager/manager');  //管理员
const addManager = () => import('../pages/manager/components/addManager');  //管理员添加
const cate = () => import('../pages/cate/cate');  //商品分类
const addCate = () => import('../pages/cate/components/addCate');  //商品分类添加


export default new Router({
  routes: [{
      // 登录
      path: '/login',
      name: '登录',
      component: login
    },
    {
      // 框架
      path: '/index',
      component: index,
      children: [{
          // 首页
          path: 'home',
          name: '首页',
          component: home
        },
        {
          // 菜单管理
          path: 'menu',
          name: '菜单',
          component: menu,
        },
        {
          // 菜单添加
          path: 'add',
          name: '菜单添加',
          component: add,
        },
        {
          // 角色管理
          path: 'role',
          name: '角色',
          component: role,
        },
        {
          // 角色添加
          path: 'addRole',
          name: '角色添加',
          component: addRole,
        },
        {
          // 管理员管理
          path: 'manager',
          name: '管理员管理',
          component: manager,
        },
        {
          // 管理员添加
          path: 'addManager',
          name: '管理员添加',
          component: addManager,
        },
        {
          //  商品分类
          path: 'cate',
          name: '商品分类',
          component: cate,
        },
        {
          //  商品分类添加
          path: 'addCate',
          name: '商品分类添加',
          component: addCate,
        },
        {
          // 首页
          path: '',
          redirect: '/index/home'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
