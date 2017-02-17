/**
 * @module vuex/actions
 */
export default {
  /**
   * Mutate the temporary data to a new object
   * @param commit
   * @param {object} newSet
   * @example store.dispatch('temporaryData',object)
   */
  temporaryData({ commit }, newSet) {
    commit('temporaryData', newSet)
  },
}
