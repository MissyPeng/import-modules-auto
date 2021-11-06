const state = {
    countA: 0
}

const mutations = {
    increaseCount: state => {
        state.countA ++;
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