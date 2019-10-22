<template>
  <li class="todo-item">
    <input
      ref="checkboxInput"
      @change="checkboxInputHandler"
      type="checkbox"
      :checked="item.completed"
    >
    <input
      ref="input"
      @input="editItemHandler"
      @blur="inputBlurHandler"
      :disabled="!editable"
      :value="item.title"
      class="todo-item__input"
    >
    <button
      class="todo-item__edit-button"
      @click="editButtonClickHandler">
      Edit item
    </button>
    <button
      class="todo-item__delete-button"
      @click="deleteButtonClickHandler">
      Delete item
    </button>
  </li>
</template>

<script>
  export default {
    name: "TodoItem",
    data() {
      return {
        editable: false
      }
    },
    props: {
      item: {
        type: Object,
        require: true
      }
    },
    methods: {
      checkboxInputHandler(e) {
        this.$emit('change-item-status', this.item, e.target.checked)
      },
      editItemHandler(e) {
        this.$emit('edit-item', this.item, e.target.value)
      },
      inputBlurHandler() {
        this.editable = false
      },
      async editButtonClickHandler() {
        this.editable = true;
        await this.$nextTick();
        this.$refs.input.focus();
      },
      deleteButtonClickHandler() {
        this.$emit('delete-item', this.item)
      }
    }
  }
</script>

<style scoped lang="scss">
  .todo-item {
    padding: 10px 0;
    display: flex;
    flex-direction: row;

    &__input {
      border: none;
      width: 65%;
      border-bottom: 1px solid blue;

      &:focus {
        outline: none;
      }

      &:disabled {
        border-bottom: 1px solid transparent;
        color: inherit;
        background: inherit;
      }
    }

    &__edit-button {
      margin-left: auto;
      width: 15%;
    }

    &__delete-button {
      width: 15%;
    }
  }
</style>
