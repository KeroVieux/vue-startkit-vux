/**
 * Created by PetitKero on 13/10/2016.
 */

import queryString from 'query-string'

/**
 * This provides mixins used for common api in the Vue components.
 * Before you begin to used it , plz inject this mixins in the components
 * like mixins: [ApiMixin]
 *
 * @mixin
 */

const ApiMixin = {
  async apiComments(arg = { method: 'get', params: {} }) {
    let res = null
    switch (arg.method) {
      case 'post':
        res = await axios.post(`${currentEnv.diningServer}/api/comments`, arg.params)
        break
      case 'patch':
        res = await axios.patch(`${currentEnv.diningServer}/api/messages/${arg.params.related_message_id}/comments/${arg.params.comment_id}`, arg.params)
        break
      default:
        res = await axios.get(`${currentEnv.diningServer}/api/messages/${arg.params && arg.params.message_id ? arg.params.message_id : ''}?${queryString.stringify(arg.params)}`)
    }
    return res.data
  },
  /**
   /* 获取ldap用户信息
   /* @param arg 用户参数{ depId: 'CR0032000059', oprId: 'ANXING' }
   /* @return array 对应的用于信息
   **/
  async getLdapUsers(arg) {
    const req = await axios.get(`/api/qy-wexin/ldap-users?${queryString.stringify(arg)}`)
    return req.data
  },
  handleReqError(req) {
    if (req.data.error) {
      this.$vux.toast.show({
        type: 'text',
        text: req.data && req.data.error ? req.data.error : '未知错误',
      })
    }
    return req.data.error
  },
  handleCatchError(err) {
    console.log('handleCatchError err', err)
    return false
  },
}

export default {
  created() {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },
  methods: ApiMixin,
}
