const state = {
  width: '',
  height: '',
};

const getters = {
  getWidth(state) {
    return state.width;
  },
  getHeight(state) {
    return state.height;
  },
};
const mutations = {
  setWidth(state, width) {
    state.width = width;
  },
  setHeight(state, height) {
    state.height = height;
  },
};

const actions = {
  isMobile(context, maxSize) {
    if (context.getters.getWidth < maxSize) {
      return true;
    } else {
      return false;
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
