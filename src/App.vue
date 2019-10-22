<template>
  <div id="app">
    <div class="stats-container">
      <span class="stats-container__item">
        All todo's: {{todoList.length}}
      </span>
      <span class="stats-container__item">
        Uncompleted todo's: {{uncompletedTodoItems.length}}
      </span>
      <button
        @click="statsButtonClickHandler"
        class="stats-container__button"
      >
        Clear completed
      </button>
    </div>
    <div class="workflow-container">
      <form-input
        @submit="submitHandler"
      />
      <div class="todo-filters">
        <button
          class="todo-filters__item"
          :class="{'todo-filters__item-active': filter === activeFilter}"
          v-for="filter in filters"
          @click="filterButtonClickHandler(filter)"
          :key="filter"
        >
          {{filter}}
        </button>
      </div>
      <ul class="todo-list">
        <todo-item
          @change-item-status="changeItemStatusHandler"
          @edit-item="editTodoItemHandler"
          @delete-item="deleteTodoItemHandler"
          v-for="item in filteredTodoList"
          :key="item.id"
          :item="item"
        />
      </ul>
    </div>
    <progress-bar-wrapper
      :completedTodoProgress="completedTodoProgress"
      :todoList="todoList"
    />
  </div>
</template>

<script>
import ProgressBarWrapper from './components/ProgressBarWrapper'  ;
import FormInput from "./components/FormInput";
import TodoItem from "./components/TodoItem";
import { mapGetters, mapMutations } from 'vuex';
import {
  moduleName as todoListModule,
  ADD_TODO_ITEM,
  ACTIVE_FILTER,
  DELETE_TODO_ITEM,
  EDIT_TODO_ITEM,
  UNCOMPLETED_TODO_ITEMS,
  TODO_ITEMS,
  FILTERED_TODO_ITEMS,
  FILTERS,
  CHANGE_TODO_ITEM_COMPLETE_STATUS,
  CHANGE_ACTIVE_FILTER
} from "./store/todoListController";

export default {
  name: 'app',
  components: {
    TodoItem,
    FormInput,
    ProgressBarWrapper
  },
  beforeMount() {
    let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    todoItems.forEach(item => this.addItemToTodoList(item))
  },
  watch: {
    todoList: {
      handler(to) {
        localStorage.setItem('todoItems', JSON.stringify(to));
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      activeFilter: todoListModule + ACTIVE_FILTER,
      uncompletedTodoItems: todoListModule + UNCOMPLETED_TODO_ITEMS,
      todoList: todoListModule + TODO_ITEMS,
      filteredTodoList: todoListModule + FILTERED_TODO_ITEMS,
      filters: todoListModule + FILTERS
    }),
    completedTodoProgress() {
      return (1 - (this.uncompletedTodoItems.length / this.todoList.length) || 0).toFixed(2) || 0
    }
  },
  methods: {
    ...mapMutations({
      changeActiveFilter: todoListModule + CHANGE_ACTIVE_FILTER,
      changeTodoItemCompleteStatus: todoListModule + CHANGE_TODO_ITEM_COMPLETE_STATUS,
      addItemToTodoList: todoListModule + ADD_TODO_ITEM,
      deleteItemFromTodoList: todoListModule + DELETE_TODO_ITEM,
      editTodoItem: todoListModule + EDIT_TODO_ITEM,
    }),
    statsButtonClickHandler() {
      this.uncompletedTodoItems.forEach(item => this.deleteItemFromTodoList(item));
    },
    filterButtonClickHandler(filter) {
      this.changeActiveFilter(filter)
    },
    changeItemStatusHandler(item, value) {
      this.changeTodoItemCompleteStatus({
        item: item,
        status: value
      })
    },
    deleteTodoItemHandler(todoItem) {
      this.deleteItemFromTodoList(todoItem)
    },
    editTodoItemHandler(item, value) {
      this.editTodoItem({
        item: item,
        title: value
      })
    },
    submitHandler(data) {
      this.addItemToTodoList({
        title: data,
        completed: false,
        id: this.getRandomId()
      })
    },
    getRandomId() {
      return Math.random().toString(36).substr(2, 9);
    }
  }
}
</script>

<style lang="scss">
  #app {
    padding: 25px;
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    box-sizing: border-box;
  }

  .stats-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 20%;

    &__button {
      width: 40%;
    }
  }

  .workflow-container {
    flex-grow: 1;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    max-width: 600px;
  }

  .todo-list {
    padding-inline-start: 0;
    display: flex;
    flex-direction: column;
  }

  .todo-filters {
    display: flex;
    justify-content: center;
    margin-top: 25px;

    &__item {
      background: transparent;
      border: none;
      text-transform: capitalize;
      border-bottom: 1px solid transparent;
      width: 25%;

      &-active {
        border-bottom: 1px solid blue;
      }

      &:focus {
        outline: none;
      }
    }
  }

  body {
    margin: 0;
  }
</style>
