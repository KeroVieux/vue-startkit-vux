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
   * Generate the logs on server , when the user have done something sensitive with server requires,
   * such like login/send msg/delete data.
   * @param {object} params request_name, request_path, request_params, blablabla
   * @returns {object} error or not
   */
  async sendLog(params) {
    const res = await axios.post(`${currentEnv.logsUrl}/logs`, params)
    return res.data
  },
  /**
   * Get information of ldap user from server,
   * ordinary for fetch a specific user's info
   * @param {object} arg depId: 'CR0032000059', oprId: 'ANXING'
   * @returns {object} object of user's info
   */
  async apiLdapUsers(arg) {
    const req = await axios.get(`${currentEnv.wxServer}/api/qy-wexin/ldap-users?${queryString.stringify(arg)}`)
    return req.data
  },
  /**
   * Get information of wx user from server,
   * ordinary for detect a user's auth when it entered app at once
   * @param {object} params agentId, code, fake
   * @returns {object} { error: null, ldapUserInfo: [], weixinUserInfo:{} }
   */
  async apiWxUser(params) {
    const req = await axios.get(`${currentEnv.wxServer}/api/qy-wexin/user_detail?${queryString.stringify(params)}`)
    return req.data
  },
}

export default {
  created() {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },
  methods: ApiMixin,
}
