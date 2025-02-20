import axios from '@/axios/request.js'
import store from '@/store/index.js'
export default {
    namespaced: true,
    state() {
        return {
            request: []

        }
    },
    mutations: {
        setRequests(state, requests) {
            state.request = requests;
        },
        addRequest(state, request) {
            state.request.push(request)
        }
    },
    actions: {
        async create({commit, dispatch}, payload) {
            try {
                const token = store.getters['auth/token']
                const data = await axios.post(`/requests.json?auth=${token}`,payload)
                console.log(data)
                commit('addRequest', {...payload, id: data.data.name})
                dispatch('setMessage', {
                    value: 'Заявка успешно создана',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async load({commit, dispatch}) {
            try {
                const token = store.getters['auth/token']
                const data = await axios.get(`/requests.json?auth=${token}`)
                const requests = Object.keys(data.data).map(id => ({...data.data[id], id}))
                commit('setRequests', requests)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }
    },
    getters: {
        requests(state) {
            return state.request
        }
    }
}