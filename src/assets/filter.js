import Vue from 'vue'
export default (function () {
  Vue.filter('percent', function (value) {
    if(!isNaN(value)){
      let ret = value.toFixed(2)
      return ret+'%'
    }else{
      return '暂无数据'
    }
  })
  Vue.filter('area', function (value) {
    return value.substr(0,2)
  })
  Vue.filter('saveFloat', function (value) {
    let ret = ''
    if(!value){
      ret = '数据未录入'
    }else{
      let string = value.toString()
      if(string.indexOf('e') > 0){
        ret = '0.001'
      }else{
        let int = parseInt(value).toString()
        let index = string.indexOf('.')
        let num = string.substr(index,4)
        ret = int+num
        if(ret == '0.000'){
          ret = '0.001'
        }
      }
    }
    return ret
  })
})()