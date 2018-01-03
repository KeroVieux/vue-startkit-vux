/**
 * Created by PetitKero on 13/10/2016.
 */

import queryString from 'query-string'
import To from 'await-to-js'

/**
 * This provides mixins used for common api in the Vue components.
 * Before you begin to used it , plz inject this mixins in the components
 * like mixins: [ApiMixin]
 *
 * @mixin
 */

const ApiMixin = {
  async apiSendMsg(token, params) {
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    })
    const [err, req] = await To(instance.post(`${currentEnv.wxServer}/api/weixin-news-msgs`, params))
    return this.globalCB(err, req)
  },
  async apiArticles(arg = { method: 'get', params: {} }) {
    let [err, req] = [null, null]
    switch (arg.method) {
      case 'post':
        [err, req] = await To(axios.post('articles/', arg.params))
        break
      case 'patch':
        [err, req] = await To(axios.patch(`articles/${arg.params.article_id}`, arg.params))
        break
      default:
        [err, req] = await To(axios.get(`articles/${arg.params && arg.params.article_id ? arg.params.article_id : ''}?${queryString.stringify(arg.params)}`))
    }
    return this.globalCB(err, req)
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
   * Get information of wx user from server,
   * ordinary for detect a user's auth when it entered app at once
   * @param {object} params agentId, code, fake
   * @returns {object} { error: null, ldapUserInfo: [], weixinUserInfo:{} }
   */
  async apiWxUser(params) {
    const req = await axios.get(`${currentEnv.wxServer}/api/qy-wexin/user_detail?${queryString.stringify(params)}`)
    return req.data
  },
  /**
   * Get information of ldap user from server,
   * ordinary for fetch a specific user's info
   * @param {object} arg depId: 'CR0032000059', oprId: 'ANXING'
   * @returns {object} object of user's info
   */
  async ldapUsers(arg) {
    const [err, req] = await To(axios.get(`${currentEnv.wxServer}/api/qy-wexin/ldap-users?${queryString.stringify(arg)}`))
    return this.globalCB(err, req)
  },
  globalCB(err, req) {
    if (err) {
      this.$vux.alert.show({
        title: '提示',
        content: _.toString(err),
      })
      return { error: _.toString(err) }
    } else if (req && req.data && req.data.status === 401) {
      this.$vux.alert.show({
        title: '提示',
        content: '请先登录',
      })
      this.$router.push('/entrances/signin')
    } else if (req && req.data && req.data.error) {
      this.$vux.alert.show({
        title: '提示',
        content: _.toString(req.data.error),
      })
    }
    return req.data
  },
}

export default {
  methods: ApiMixin,
}
