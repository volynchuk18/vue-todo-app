//mutations
export const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
export const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM';
export const EDIT_TODO_ITEM = 'EDIT_TODO_ITEM';
export const CHANGE_TODO_ITEM_COMPLETE_STATUS = 'CHANGE_TODO_ITEM_COMPLETE_STATUS';
export const CHANGE_ACTIVE_FILTER = 'CHANGE_ACTIVE_FILTER';

//getters
export const FILTERS = 'FILTERS';
export const ACTIVE_FILTER = 'ACTIVE_FILTER';
export const TODO_ITEMS = 'TODO_ITEMS';
export const FILTERED_TODO_ITEMS = 'FILTERED_TODO_ITEMS';
export const UNCOMPLETED_TODO_ITEMS = 'UNCOMPLETED_TODO_ITEMS';

export const moduleName = 'todoListController/';

const findObjectInArrayBy = (array, object, by) => {
  return array.find(item => item[by] === object[by])
};

const module = {
  namespaced: true,
  state: {
    todoList: [],
    filters: ['all', 'completed', 'uncompleted'],
    activeFilter: 'all'
  },

  mutations: {
    [CHANGE_ACTIVE_FILTER](state, payload) {
      state.activeFilter = payload
    },
    [DELETE_TODO_ITEM](state, payload) {
      state.todoList = state.todoList.filter(item => item.id !== payload.id)
    },
    [ADD_TODO_ITEM](state, payload) {
      state.todoList.push(payload)
    },
    [EDIT_TODO_ITEM](state, payload) {
      findObjectInArrayBy(state.todoList, payload.item, 'id').title = payload.title
    },
    [CHANGE_TODO_ITEM_COMPLETE_STATUS](state, payload) {
      findObjectInArrayBy(state.todoList, payload.item, 'id').completed = payload.status;
    }
  },

  getters: {
    [ACTIVE_FILTER](state) {
      return state.activeFilter
    },
    [FILTERS](state) {
      return state.filters
    },
    [TODO_ITEMS](state) {
      return state.todoList
    },
    [UNCOMPLETED_TODO_ITEMS](state) {
      return state.todoList.filter(item => !item.completed)
    },
    [FILTERED_TODO_ITEMS](state) {
      switch (state.activeFilter) {
        case 'completed':
          return state.todoList.filter(item => item.completed);
        case 'uncompleted':
          return state.todoList.filter(item => !item.completed);
        default:
          return state.todoList;
      }
    }
  }
};

export default module
