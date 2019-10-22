<template>
  <div class="progress-container">
    <progress-bar
      class="progress-container__progress-bar"
      type="circle"
      ref="circle"
      :options="options"
    />
    <button
      class="progress-container__uncomplete-button"
      @click="progressButtonClickHandler"
    >
      {{progressButtonText}}
    </button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import {
    moduleName as todoListModule,
    CHANGE_TODO_ITEM_COMPLETE_STATUS,
  } from "../store/todoListController";

  export default {
    name: "ProgressBarWrapper",
    props: {
      completedTodoProgress: {
        type: String
      },
      todoList: {
        type: Array
      }
    },
    data() {
      return {
        options: {
          text: {
            value: null
          },
          strokeWidth: 10,
          duration: 300,
          easing: 'easeInOut',
          from: {
            color: '#eee'
          },
          to: {
            color: '#3079f4'
          },
          step(state, circle) {
            circle.path.setAttribute('stroke', state.color);
          }
        }
      }
    },
    computed: {
      progressButtonText() {
        return +this.completedTodoProgress === 1 ? 'Uncomplete All' : 'Complete All'
      },
    },
    watch: {
      completedTodoProgress() {
        this.animateCircle()
      },
    },
    mounted() {
      this.animateCircle()
    },
    methods: {
      ...mapMutations({
        changeTodoItemCompleteStatus: todoListModule + CHANGE_TODO_ITEM_COMPLETE_STATUS,
      }),
      animateCircle() {
        this.$refs.circle.setText((this.completedTodoProgress * 100 || 0).toFixed() + '%');
        this.$refs.circle.animate(this.completedTodoProgress)
      },
      progressButtonClickHandler() {
        let status = +this.completedTodoProgress !== 1;
        this.todoList.forEach(item => {
          this.changeTodoItemCompleteStatus({
            item: item,
            status: status
          })
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .progress-container {
    width: 20%;
  }

  .progress-container__progress-bar {
    margin: 0 auto;
    width: 50%;
  }

  .progress-container__uncomplete-button {
    display: block;
    margin: 10px auto 0;
  }
</style>
