import Vue from 'vue'
import Vuex from 'vuex'
import todoListController from './todoListController.js'

Vue.use(Vuex);

const storeObject = {
  modules: {
    todoListController
  }
}

export const store = new Vuex.Store(storeObject);

export default store;
