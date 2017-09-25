// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/MainLayout'
import Index from './MainPanel'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  // indexRoute: { onEnter: (nextState, replace) => replace('/index') },
  childRoutes : [
    Index(store),
  ]
})


export default createRoutes
