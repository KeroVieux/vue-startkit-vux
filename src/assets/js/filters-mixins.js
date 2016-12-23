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
   * @param {number} length - How many letters you would keep stay .
   * @param {string} omission - The sign means more (default is '...') .
   * @returns {string}
   * @example
   * {{data.body | truncate(30)}}
   */
  truncate(str, length, omission) {
    if (!omission) {
      omission = '...'
    }
    if (str.length > length) {
      return str.substring(0, length - omission.length) + omission
    } else {
      return str
    }
  },
  /**
   * Detect it's a real empty
   * @param {string} value - A arg gonna be detect .
   * @param {string} defaultText - If it's a empty arg , will show the default test .
   * @returns {string}
   * @example
   * {{data.author | isEmpty('管理员')}}
   */
  isEmpty(value, defaultText) {
    let trimValue = _.trim(value)
    if (!trimValue) {
      if(defaultText){
        return defaultText
      }else {
        return '空'
      }
    }else {
      return trimValue
    }
  },
  /**
   * Translate the gender from the data
   * @param {string} value - A arg gonna be detect .
   * @returns {string}
   * @example
   * {{data.gender | formatSex}}
   */
  formatSex(value) {
    switch (value) {
      case 'F':
        return '女'
        break
      case 'M':
        return '男'
        break
      default:
        return '保密'
    }
  },
  /**
   * Translate the status from the data in OA
   * @param {string} value - A arg gonna be detect .
   * @returns {string}
   * @example
   * {{data.status | formatStatus}}
   */
  formatStatus(value) {
    switch (value) {
      case 1:
        return '已通过'
        break
      case 2:
        return '驳回'
        break
      default:
        return '待审批'
    }
  },
  /**
   * Translate the type from the data in the history operation
   * @param {string} value - A arg gonna be detect .
   * @returns {string}
   * @example
   * {{data.status | formatReportType}}
   */
  formatReportType(value) {
    switch (value) {
      case 0:
        return '上报新案件'
        break
      case 1:
        return '控股反馈'
        break
      case 2:
        return '上传判决结果'
        break
      case 3:
        return '上报结案'
        break
      default:
        return '其他'
    }
  },
  /**
   * Translate the Enabled status from the data at anywhere
   * @param {string} value - A arg gonna be detect .
   * @returns {string}
   * @example
   * {{data.enabled | formatEnabled}}
   */
  formatEnabled(value) {
    switch (value) {
      case 0:
        return '作废'
        break
      case 1:
        return '正常'
        break
      default:
        return '错误'
    }
  },
  /**
   * Translate the type from the data in the minute module.
   * @param {string} value - A arg gonna be detect .
   * @returns {string}
   * @example
   * {{data.type | formatMinuteType}}
   */
  formatMinuteType(value) {
    switch (value) {
      case 'minute_type_newcase':
        return '新建案件'
        break
      case 'minute_type_other':
        return '其他'
        break
      default:
        return '其他'
    }
  },
  flow_status(value) {
    this.apiGetCommonOptions().then( (res) => {
      let flow_status = _.find(res, {'code': 'case_approve_pass'})
      let statusText = '未知状态'
      _(flow_status).forEach((item) => {
        if(item.category_id == value){
          statusText =  item.name
        }
        if(item.children){
          _(item.children).forEach((childItem) => {
            if(childItem.category_id == value){
              statusText =  childItem.name
            }
          })
        }
      })
      return statusText
    })

  }
}
export default {
  filters:FiltersMixin
}