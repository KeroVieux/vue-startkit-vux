/**
 * Created by PetitKero on 13/10/2016.
 */
import queryString from 'query-string'
import { MessageBox } from 'mint-ui'
/**
 * This provides mixins used for common api in the Vue components. Before you begin to used it , plz inject this mixins in the components
 * like mixins: [ApiMixin]
 *
 * @requires queryString
 * @requires MessageBox from 'mint-ui'
 *
 * @mixin
 */
const ApiMixin = {
  /**
   * Catch the error from a promise
   */
  catchXHR(response,reject) {
    console.log('请求参数',response.request)
    Indicator.close()
    if (this.submitting === true) {
      this.submitting = false
    }
    let err = response.statusText ? '程序内部错误' : '遇到未知错误'
    MessageBox.confirm(err).then(action => {
      location.reload()
    },cancel => {

    })
    reject(response.status)
  },
  /**
   * Done with the a promise , detect the user if it's login in a correct way
   */
  doneXHR(response,resolve,reject) {
    Indicator.close()
    if (this.submitting === true) {
      this.submitting = false
    }
    if (response.data.status === 401) {
      Toast(response.data.error)
      this.$router.push('/login/sims')
      //history.back()
    }else {
      if (!response.data.error) {
        resolve(response.data.result)
      }else {
        Toast(response.data.error)
        reject(response.data.error)
      }
    }
  },
  testApi() {
    return new Promise((resolve, reject) => {
      this.$http.get('api/users/').then((response) => {
        console.log('s',response)
        resolve(response.data.result)
      }).catch((response) => {
        console.log('f',response)
        this.catchXHR(response, reject)
      })
    })
  },
  /**
   * Api for user login , it will set the http header for the authorization when it success.
   * @param {string} rtp - a token from arg , if it's empty ,this function will get the param from URL
   * @example
   * apiLogin('123123')
   */
  apiLogin(rtp) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      let thisRtp = null
      if (rtp) {
        thisRtp = rtp
      }else {
        if (this.urlParamToObj().rtp_token || store.state.route.query.rtp_token) {
          if (!_.isEmpty(this.urlParamToObj())) {
            thisRtp = this.urlParamToObj().rtp_token
          }else {
            thisRtp = store.state.route.query.rtp_token
          }
        }else {
          Toast('非法侵入')
        }
      }
      console.log('发送的登录参数',thisRtp)
      this.$http.post('api/users/auth/sso',{rtp_token:thisRtp}).then((response) => {
        Indicator.close()
        if (response.data.status !== 200) {
          Toast('登录失败')
          reject(response.data.status)
          this.$router.push('/login/sims')
          //history.back()
        }else {
          Toast('登录成功')
          resolve(response.data.result)
          Vue.http.headers.common['authorization'] = response.data.authorization
          window.userToken = response.data.authorization
          window.currentUser = response.data.result
          console.log('currentUser',window.currentUser)
        }
      }).catch((response) => {
        this.catchXHR(response, reject)
        this.$router.push('/login/sims')
        //history.back()
      })
    })
  },
  /**
   * Api for get entities .
   * @param {string} entityId - default is empty , it will get all entities when this param is empty
   * @param {string} condition - default is empty
   * @returns {array} It would be a bunch of entities.
   * @example
   * getEntities('123123')
   */
  getEntities(entityId = '',condition){
    return new Promise((resolve, reject) => {
      Indicator.open()
      let query = queryString.stringify(condition || {})
      let url = condition ? `api/entities?${query}` : `api/entities/${entityId}`
      this.$http.get(url).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  /**
   * Api for get cases .
   * @param {object} postData - must.
   * @returns {array} It would be a bunch of cases.
   * @example
   * apiGetCases({ fields: fields, options: { offset: 0 } })
   */
  apiGetCases(postData){
    return new Promise((resolve, reject) => {
      this.$http.post('api/cases/list', postData).then((response) => {
        Indicator.close()
        if (response.data.status === 401) {
          Toast(response.data.error)
          this.$router.push('/login/sims')
          //history.back()
        }else {
          if (!response.data.error) {
            resolve(response.data)
          }else {
            Toast(response.data.error)
            reject(response.data.error)
          }
        }
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetIndexCode(postData) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.post('api/cases/code', postData).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiAddNewCase(postData) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.post('api/cases', postData).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetCommonOptions() {
    return new Promise((resolve, reject) => {
      let commonOptions = this.$store.getters.commonOptions
      this.commonOptions = commonOptions
      if(commonOptions){
        resolve(commonOptions)
      }else {
        this.$http.get('api/categories').then((response) => {
          this.$store.dispatch('commonOptions',response.data.result).then( () => {
            resolve(response.data.result)
          })
        }).catch((response) => {
          this.catchXHR(response, reject)
        })
      }
    })
  },
  /**
   * Api for common options .
   * @param {object} condition - it could be code/category_id/parent_id
   * @returns {array} It would be a bunch of options.
   * @example
   * apiGetSomeOptions({ code:'abc' })
   */
  apiGetSomeOptions(condition = '') {
    return new Promise((resolve, reject) => {
      Indicator.open()
      let query = queryString.stringify(condition)
      this.$http.get(`api/categories?${query}`).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  /**
   * Api for get users .
   * @param {string} userId - default is empty , it will get all users when this param is empty
   * @returns {array} It would be a bunch of users.
   * @example
   * apiGetUsers('123')
   */
  apiGetUsers(userId = '') {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.get(`api/users/${userId}`).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  /**
   * Api for get a list for timings in a case .
   * @param {string} thisCaseId - must
   * @returns {array} It would be a bunch of timings
   * @example
   * apiGetUsers('123')
   */
  apiGetTimings(thisCaseId) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.get(`api/times/cases/${thisCaseId}/times`).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPostTiming(obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.post(`api/times/cases/${obj.case_id}/times`,obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPatchTiming(timingId,obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.patch(`api/times/cases/${obj.case_id}/times/${timingId}`,obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetMinutes(thisCaseId) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.get(`api/minutes?parent_id=${thisCaseId}`).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPostMinutes(obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.post('api/minutes',obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPatchMinutes(minuteId,obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.patch(`api/minutes/${minuteId}`,obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetMinutesDetail(minuteId,obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.get(`api/minutes/${minuteId}`,obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetOA(thisCaseId) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.get(`api/oa-workflows/?parent_id=${thisCaseId}`).then((response) => {
        this.doneXHR(response, resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetOADetail(oaId,obj) {
    Indicator.open()
    return new Promise((resolve, reject) => {
      this.$http.get(`api/oa-workflows/${oaId}`,obj).then((response) => {
        this.doneXHR(response, resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPostOA(obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.post('api/oa-workflows',obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPatchOA(oaId,obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.patch(`api/oa-workflows/${oaId}`,obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response,reject)
      })
    })
  },
  apiGetJudgments(thisCaseId) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.get(`api/judgments/?parent_id=${thisCaseId}`).then((response) => {
        this.doneXHR(response, resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetJudgmentsDetail(judgmentId,obj) {
    Indicator.open()
    return new Promise((resolve, reject) => {
      this.$http.get(`api/judgments/${judgmentId}`,obj).then((response) => {
        this.doneXHR(response, resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPostJudgments(obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.post('api/judgments',obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPatchJudgments(judgmentId,obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.patch(`api/judgments/${judgmentId}`,obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response,reject)
      })
    })
  },
  apiGetExecReports(thisCaseId) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.get(`api/exec-reports/?parent_id=${thisCaseId}`).then((response) => {
        this.doneXHR(response, resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetExecReportsDetail(reportId,obj) {
    Indicator.open()
    return new Promise((resolve, reject) => {
      this.$http.get(`api/exec-reports/${reportId}`,obj).then((response) => {
        this.doneXHR(response, resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPostExecReports(obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.post('api/exec-reports',obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPatchExecReports(reportId,obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.patch(`api/exec-reports/${reportId}`,obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response,reject)
      })
    })
  },
  apiGetHistories(thisCaseId) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.get(`api/oper-histories/cases/${thisCaseId}/oper-histories`).then((response) => {
        this.doneXHR(response,resolve)
      }).catch((response) => {
        this.catchXHR(response,reject)
      })
    })
  },
  apiGetFeedback(thisCaseId) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.get(`api/oper-histories/feedbacks/${thisCaseId}`).then((response) => {
        this.doneXHR(response, resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetHistory(thisCaseId) {
    Indicator.open()
    return new Promise((resolve, reject) => {
      this.$http.get(`api/oper-histories/cases/${thisCaseId}/oper-histories`).then((response) => {
        this.doneXHR(response, resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetFeedbackDetail(feedbackId) {
    Indicator.open()
    return new Promise((resolve, reject) => {
      this.$http.get(`api/oper-histories/${feedbackId}`).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetFiles(parent_id) {
    return new Promise((resolve, reject) => {
      this.$http.get(`api/files?parent_id=${parent_id}`).then((response) => {
        Indicator.close()
        if (this.submitting === true) {
          this.submitting = false
        }
        if (response.data.status === 401) {
          Toast(response.data.error)
          this.$router.push('/login/sims')
          //history.back()
        }else {
          if (!response.data.error) {
            resolve(response.data)
          }else {
            Toast(response.data.error)
            reject(response.data.error)
          }
        }
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  /**
   * Created a folder
   * @param obj like {file_name:'xxx',parent_id:123}
   * @returns {Promise}
   * @example apiPostFolder({file_name:'xxx',parent_id:123})
   */
  apiPostFolder(obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.post('api/files/folder',obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  /**
   *
   * @param obj '{file:[],parent_id:xxx}'
   * @returns {Promise}
   */
  apiPostFiles(obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.post(`api/files`,obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetCasesDetail(thisCaseId) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.get('api/cases/' + thisCaseId).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPatchCasesDetail(thisCaseId,obj) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.patch(`api/cases/${thisCaseId}`,obj).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPostHistory(caseId, postData) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.post(`api/oper-histories/cases/${caseId}/oper-histories`, postData).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPatchFeedback(caseId,feedbackId, data) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.patch(`api/oper-histories/cases/${caseId}/oper-histories/${feedbackId}`, data).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiGetOtherRoles(caseId,user_id = '') {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.$http.get(`api/cases/${caseId}/other-role-users/${user_id}`).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPostOtherRoles(caseId,data) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.post(`api/cases/${caseId}/other-role-users`, data).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  apiPatchOtherRoles(caseId,userId,data) {
    return new Promise((resolve, reject) => {
      Indicator.open()
      this.submitting = true
      this.$http.patch(`api/cases/${caseId}/other-role-users/${userId}`, data).then((response) => {
        this.doneXHR(response,resolve,reject)
      }).catch((response) => {
        this.catchXHR(response, reject)
      })
    })
  },
  getDetail(detailsInState,thisCaseId) {
    return new Promise((resolve) => {
      this.apiGetCasesDetail(thisCaseId).then( (res) => {
        detailsInState.push(this.singleCaseStatus(res))
        store.dispatch('casesDetailSet',detailsInState).then( () => {
          resolve(res)
        })
      })
    })
  },
  setDetail(thisCaseId) {
    return new Promise((resolve) => {
      let detailsInState = store.getters.getCaseDetail || []
      let thisCaseDetail = _.find(detailsInState,{case_id:parseInt(thisCaseId)})
      if(thisCaseDetail){
        console.log('from vuex')
        this.caseDetail = thisCaseDetail
        resolve(thisCaseDetail)
      }else {
        console.log('from server')
        this.getDetail(detailsInState,thisCaseId).then( (thisCaseDetail) => {
          this.caseDetail = thisCaseDetail
          resolve(thisCaseDetail)
        })
      }
    })
  }
}

export default {
  created() {
    document.documentElement.scrollTop = document.body.scrollTop = 0
  },
  methods:ApiMixin
}