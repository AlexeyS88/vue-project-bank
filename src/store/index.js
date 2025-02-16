import { createStore, createLogger } from 'vuex'
import auth from '../modules/auth.module'

const plugins = []

if (import.meta.env.NODE_ENV === 'development') {
    plugins.push(createLogger())
}

export default createStore({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth,
    },
    plugins,
})