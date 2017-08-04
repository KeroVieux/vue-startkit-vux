export default {
  dev: {
    DEVTOOLS: true,
    vConsole: false,
    fakeUser: true,
    postLogs: false,
    DEBUG: true,
    env: 'dev',
    wxDomain: 'http://vpower.crpower.com.cn:19000/wechat-testing3/#/?from=qy_wechat',
    wxServer: 'http://wx.crpower.com.cn:80',
    logsServer: 'http://vpower.crpower.com.cn:19000/log/service/api',
    apiServer: '',
    contextPath: 'emp',
    agentId: '1000010',
    fromApp: {
      login: {
        crp_login_from_type_runwork: 20,
        crp_login_from_type_qy_wechat: 21,
        crp_login_from_type_form: 22,
        crp_login_from_type_others: 23,
      },
    },
    boss: {
      crcCompanyid: '242',
      depIdOne: '1000003',
      depId: 'CR0031000003',
    },
  },
  sit: {
    env: 'sit',
    apiUrl: 'http://xxx',
    contextPatch: '',
    others: {
      x: 1,
      y: 2,
      z: 3,
    },
  },
  prd: {
    env: 'prd',
    apiUrl: 'http://xxx',
    contextPatch: '',
    others: {
      x: 1,
      y: 2,
      z: 3,
    },
  },
  uat: {
    env: 'uat',
    apiUrl: 'http://xxx',
    contextPatch: '',
    others: {
      x: 1,
      y: 2,
      z: 3,
    },
  },
}
