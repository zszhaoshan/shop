import {
  login
} from "../utils/request"

export default {
    userInfoActions(context,userInfo) {
    context.commit('changeUserInfo',userInfo);
  }
}
