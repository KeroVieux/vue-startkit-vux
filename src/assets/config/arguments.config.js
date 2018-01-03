export default {
  dev: {
    fakeUser: true,
    postLogs: false,
    DEBUG: true,
    env: 'dev',
  },
  sit: {},
  prd: {},
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
