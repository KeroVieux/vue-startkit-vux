/**
 * Created by PetitKero on 13/10/2016.
 */
/**
 * This provides mixins used for common api in the Vue components.
 * Before you begin to used it , plz inject this mixins in the components
 * like mixins: [ApiMixin]
 *
 * @mixin
 */
import axios from 'axios'

const ApiMixin = {
  async comment() {
    try {
      const req = await axios.get('comment.json')
      if (req.data.error) {
        this.$vux.toast.show({
          type: 'text',
          text: req.data.error,
        })
        return req.data.error
      }
      return req.data
    } catch (err) {
      this.$vux.toast.show({
        type: 'text',
        text: err.response.statusText,
      })
      return err
    }
  },
  async people() {
    try {
      const req = await axios.get('people.json')
      if (req.data.error) {
        this.$vux.toast.show({
          type: 'text',
          text: req.data.error,
        })
        return req.data.error
      }
      return req.data
    } catch (err) {
      this.$vux.toast.show({
        type: 'text',
        text: err.response.statusText,
      })
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
