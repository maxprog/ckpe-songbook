import Vue from 'vue'
import Vuex from 'vuex'
import showcase from './showcase'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    showcase
  }
})

if (process.env.DEV && module.hot) {
  module.hot.accept(['./showcase'], () => {
    const newShowcase = require('./showcase').default
    store.hotUpdate({ modules: { showcase: newShowcase } })
  })
}

export default store
