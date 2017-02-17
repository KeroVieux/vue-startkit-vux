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
/* eslint-disable */
const ApiMixin = {
  comment() {
    return window.axios.get('http://azu.github.io/promises-book/json/comment.json')
  },
  people() {
    return window.axios.get('http://azu.github.io/promises-book/json/people.json')
  },
}

export default {
  created() {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },
  methods: ApiMixin,
}
