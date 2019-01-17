import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import common from './common'

const debug = process.env.NODE_ENV !== 'production'
const plugins = []

export default new Vuex.Store({
    modules: {
        common
    },
    strict: debug,
    plugins
})