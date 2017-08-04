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
  async getUsers(arg) {
    try {
      const req = await axios.get(`/api/qy-wexin/ldap-users?${queryString.stringify(arg)}`)
      return req.data
    } catch (err) {
      this.handleCatchError(err)
      return err
    }
  },
  async usersList() {
    try {
      const req = await axios.get('users')
      if (req.error) {
        return this.handleReqError(req)
      }
      return req.data
    } catch (err) {
      this.handleCatchError(err)
      return err
    }
  },
  async user(username) {
    try {
      const req = await axios.get(`users/${username}`)
      if (req.error) {
        return this.handleReqError(req)
      }
      return req.data
    } catch (err) {
      this.handleCatchError(err)
      return err
    }
  },
}

export default {
  created() {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },
  methods: ApiMixin,
}
