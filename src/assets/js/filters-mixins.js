/**
 * Created by PetitKero on 11/11/2016.
 */

/**
 * This provides mixins used for common filters in the Vue components. Before you begin to used it , plz inject this mixins in the components
 * like mixins: [FiltersMixin]
 *
 * @mixin
 */
const FiltersMixin = {
  /**
   * Timing formatter
   * @param {date} value - A timing need to formatted , whatever the org format looks like .
   * @param {string} format - (more info: http://momentjs.cn/ ) .
   * @see {@link http://momentjs.cn/}
   * @returns {Date|string}
   * @example
   * {{data.created_at | formatDate('l')}}
   */
  formatDate(value, format) {
    if (value) {
      if (_.isDate(new Date(value))) {
        return Moment(value).format(format)
      } else {
        return '日期错误'
      }
    } else {
      return '无日期'
    }
  },
  /**
   * Truncate
   * @param {string} str - A long sentence need truncate .
   * @param {object} options - The options object .
   * @returns {string}
   * @example
   * {{data.body | truncate({'length': 24, 'separator': /,? +/, 'omission': ' [...]'})}}
   */
  truncate(str, options) {
    return _.truncate(str,options)
  },
}
export default {
  filters:FiltersMixin
}