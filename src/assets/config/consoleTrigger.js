export default (DEBUG) => {
  if (!DEBUG) {
    if (!window.console) window.console = {}
    const methods = ['log', 'debug', 'warn', 'info']
    _(methods).forEach((i) => {
      console[i] = () => {}
    })
  }
}
