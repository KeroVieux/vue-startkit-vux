/**
 * Created by PetitKero on 30/9/2016.
 */
const _ = window._
const mutations = {
  temporaryData(state, newSet) {
    _.assign(state, {
      temporaryData: newSet,
    })
  },
  allChartData(state, newSet) {
    _.assign(state, {
      allChartData: newSet,
    })
  },
}

export default mutations
