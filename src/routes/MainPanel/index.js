import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'index',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const comp = require('./containers/MainPanel').default
      cb(null, comp)
    }, 'main-panel')
  },
})
