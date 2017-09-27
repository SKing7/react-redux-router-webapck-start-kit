// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/MainLayout'
import MainPanel from './MainPanel'
import { injectReducer } from '../store/reducers'

const mapReducer = require('../modules/map').default;

export const createRoutes = (store) => {
  injectReducer(store, { key: 'map', reducer: mapReducer })
  return {
    path        : '/',
    component   : CoreLayout,
    // indexRoute: { onEnter: (nextState, replace) => replace('/index') },
    childRoutes : [
      MainPanel(store),
    ]
  }
}


export default createRoutes
