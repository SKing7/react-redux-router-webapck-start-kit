import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'index',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const comp = require('./containers/MainPanel').default;
      const reducer = require('./modules/mainPanel').default;

      injectReducer(store, { key: 'index', reducer })
      cb(null, comp);
    }, 'main-panel')
  },
})
