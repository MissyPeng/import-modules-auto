const state = {
    countB: 0
}

const mutations = {
    increaseCount: state => {
        state.countB ++;
    }
}

const actions = {
    increaseCount({ commit }) {
        setTimeout(() => {
            commit('increaseCount');
        }, 500);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}