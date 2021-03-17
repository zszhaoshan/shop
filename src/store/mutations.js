export const state = {
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
};
export const mutations = {
  changeUserInfo(state, userInfo) {
    state.user = userInfo;
    if(userInfo){
        sessionStorage.setItem('user', JSON.stringify(userInfo));
    }else{
        sessionStorage.removeItem('user');
    }
  }
};
export const getters = {
  user(state) {
    return state.user;
  }
};
