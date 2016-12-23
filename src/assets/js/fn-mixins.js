/**
 * This provides mixins used for common functions in the Vue components. Before you begin to used it , plz inject this mixins in the components
 * like mixins: [FnMixin]
 *
 * @mixin
 */
const fnMixin = {
  /**
   * Get the query params from the URL
   * @returns {{}|*} like '123456789'
   * @example
   * let token = urlParamToObj().rtp_token
   */
  urlParamToObj() {
    let fn, item, j, len, p, sear, u
    if (location.search) {
      u = location.search
    } else {
      u = location.href;
      u = u.slice(0, u.indexOf("#"))
    }
    p = {}
    if (-1 !== u.indexOf("?")) {
      sear = u.slice(u.indexOf("?") + 1).split("&")
      fn = function(item) {
        let s
        s = item.split("=")
        return p[s[0]] = s[1]
      }
      for (j = 0, len = sear.length; j < len; j++) {
        item = sear[j]
        fn(item)
      }
    }
    return p;
  },
  isArray(target) {
    if(_.isArray(target)){
      return (target.length >0)
    }else {
      return false
    }
  },
  /**
   * Let the page scroll to the top
   */
  goToTop() {
    let timer = null
    let isTop = true
    timer = setInterval(() => {
      let toTop = document.body.scrollTop || document.documentElement.scrollTop
      let speed = Math.ceil(toTop / 5)
      document.documentElement.scrollTop = document.body.scrollTop = toTop - speed
      isTop = true
      if (toTop == 0) {
        clearInterval(timer)
      }
    }, 50)
  },
  /**
   * Replace the numerical to the ancient Chinese number
   * @param {number} num - number need to replaced
   * @returns {string} like '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'
   * @example
   * let cny = numToCny(100)
   */
  numToCny(num){
    let capUnit = ['万', '亿', '万', '', ''];
    let capDigit = {2: ['角', '分', ''], 4: ['仟', '佰', '拾', '']};
    let capNum = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    if (((num.toString()).indexOf('.') > 16) || (isNaN(num)))
      return '';
    num = (Math.round(num * 100) / 100).toString();
    num = ((Math.pow(10, 19 - num.length)).toString()).substring(1) + num;
    let i, ret, j, nodeNum, k, subret, len, subChr, CurChr = [];
    for (i = 0, ret = ''; i < 5; i++, j = i * 4 + Math.floor(i / 4)) {
      nodeNum = num.substring(j, j + 4);
      for (k = 0, subret = '', len = nodeNum.length; ((k < len) && (parseInt(nodeNum.substring(k)) != 0)); k++) {
        CurChr[k % 2] = capNum[nodeNum.charAt(k)] + ((nodeNum.charAt(k) == 0) ? '' : capDigit[len][k]);
        if (!((CurChr[0] == CurChr[1]) && (CurChr[0] == capNum[0])))
          if (!((CurChr[k % 2] == capNum[0]) && (subret == '') && (ret == '')))
            subret += CurChr[k % 2];
      }
      subChr = subret + ((subret == '') ? '' : capUnit[i]);
      if (!((subChr == capNum[0]) && (ret == '')))
        ret += subChr;
    }
    ret = (ret == '') ? capNum[0] + capUnit[3] : ret;
    return ret;
  },
  setFileIcon(item){
    if (item.is_folder && item.is_folder !== '0') {
      item.icon = 'fa fa-folder-o'
    } else {
      switch (item.ext) {
        case 'doc':
          item.icon = 'fa fa-file-word-o'
          break
        case 'xls':
          item.icon = 'fa fa-file-excel-o'
          break
        case 'ppt':
          item.icon = 'fa fa-file-powerpoint-o'
          break
        case 'pdf':
          item.icon = 'fa fa-file-pdf-o'
          break
        case 'zip':
          item.icon = 'fa fa-file-archive-o'
          break
        default:
          item.icon = 'fa fa-file-picture-o'
      }
    }
  },
  /**
   * Afford a class name for the exact file in the files listing
   * @param {string} fileType - file's ext.
   * @returns {string} It's a name for class
   * @example
   * fileIcon(application/msword)
   */
  fileIcon(fileType) {
    switch(fileType) {
      case 'text/plain':
        return 'fa-text-o'
        break
      case 'application/msword':
        return 'fa-file-word-o'
        break
      case 'application/vnd.ms-excel':
        return 'fa-file-excel-o'
        break
      case 'application/vnd.ms-powerpoint':
        return 'fa-file-powerpoint-o'
        break
      case 'application/pdf':
        return 'fa-file-pdf-o'
        break
      case 'application/x-zip-compressed':
        return 'fa-file-archive-o'
        break
      default:
        return 'fa-file-picture-o'
    }
  },
  /**
   * Provide a class name for the flowStatus in a case
   * @param {string} isOther - a arg form case object.
   * @param {string} code - a arg form case object.
   * @returns {string} It's a name for class
   * @example
   * flowStatusBg(0,'new_case')
   */
  flowStatusBg(isOther,code){
    if (isOther == 1) {
      return 'bg-green'
    }else {
      switch (code) {
        case 'new_case':
          return 'bg-amber'
          break
        case 'new_case_wait_approve':
          return 'bg-deeporange'
          break
        case 'case_closed_wait_approve':
          return 'bg-deeporange'
          break
        case 'case_judged_wait_do':
          return 'bg-deeporange'
          break
        case 'new_case_approve_reject':
          return 'bg-red'
          break
        case 'case_closed_approve_reject':
          return 'bg-red'
          break
        case 'case_judged_doing':
          return 'bg-teal'
          break
        case 'case_closed':
          return  'bg-gray'
          break
        default:
          return  'bg-green'
      }
    }
  },
  refreshCaseInState(res) {
    let stateList = this.$store.getters.getCasesList || []
    let objInList = _.find(stateList,{case_id:res.case_id})
    if (objInList) {
      _.assign(objInList,this.singleCaseStatus(res))
    } else {
      stateList.unshift(res)
      this.$store.dispatch('casesListSet',stateList)
    }
    let stateDetail = this.$store.getters.getCaseDetail || []
    let objInDetail = _.find(stateDetail,{case_id:res.case_id})
    if (objInDetail) {
      _.assign(objInDetail,this.singleCaseStatus(res))
    } else {
      stateDetail.unshift(res)
      this.$store.dispatch('casesDetailSet',stateDetail)
    }
  },
  singleCaseStatus(item) {
    if (item.is_other_status && item.is_other_status === 1) {
      item.className = 'bg-green'
    }else {
      if (item.flow_status) {
        switch (item.flow_status.code) {
          case 'new_case':
            item.className = 'bg-amber'
            break
          case 'new_case_wait_approve':
            item.className = 'bg-deeporange'
            break
          case 'case_closed_wait_approve':
            item.className = 'bg-deeporange'
            break
          case 'case_judged_wait_do':
            item.className = 'bg-deeporange'
            break
          case 'new_case_approve_reject':
            item.className = 'bg-red'
            break
          case 'case_closed_approve_reject':
            item.className = 'bg-red'
            break
          case 'case_judged_doing':
            item.className = 'bg-teal'
            break
          case 'case_closed':
            item.className = 'bg-gray'
            break
          default:
            item.className =  'bg-green'
        }
      }else {
        item.className =  'bg-black'
      }
    }
    return item
  },
  filterCaseStatus(data) {
    _(data).forEach((item) => {
      this.singleCaseStatus(item)
    })
    return data
  },
  isAdmin(currentUser) {
    if (!!currentUser) {
      return !!_.find(currentUser.roles || [],{sid:'admin'})
    }
  },
  roleInCase() {
    if (!!currentUser) {
      if (this.isAdmin(currentUser)) {
        this.myRole = 'admin'
      }else {
        let supervisorList = _.find(this.caseDetail.roles,{sid:'supervisor'})
        if (!!supervisorList) {
          if (_.find(supervisorList.users,{user_id:currentUser.user_id})) {
            this.myRole = 'supervisor'
          }
        }
        let approversList = _.find(this.caseDetail.roles,{sid:'approvers'})
        if (!!approversList) {
          if (_.find(approversList.users,{user_id:currentUser.user_id})) {
            this.myRole = 'approvers'
          }
        }
        let authorList = _.find(this.caseDetail.roles,{sid:'author'})
        if (!!authorList) {
          if (_.find(authorList.users,{user_id:currentUser.user_id})) {
            this.myRole = 'author'
          }
        }
        let auxiliariesList = _.find(this.caseDetail.roles,{sid:'auxiliaries'})
        if (!!auxiliariesList) {
          if (_.find(auxiliariesList.users,{user_id:currentUser.user_id})) {
            this.myRole = 'auxiliaries'
          }
        }
        let sponsorLegalAdviserList = _.find(this.caseDetail.roles,{sid:'sponsor_legal_adviser'})
        if (!!sponsorLegalAdviserList) {
          if (_.find(sponsorLegalAdviserList.users,{user_id:currentUser.user_id})) {
            this.myRole = 'sponsor_legal_adviser'
          }
        }
      }
    }
  }
}
export default {
  methods:fnMixin
}