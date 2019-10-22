<template>
  <form
    @submit.prevent="submitHandler"
    class="form"
  >
    <div
      :class="{'focused': inputFocused || inputValue}"
      class="form__input-wrapper"
    >
      <label
        class="form__input-wrapper-label"
        for="first"
      >
        Input your deal
      </label>
      <input
        v-model="inputValue"
        @focus="inputFocusHandler"
        @blur="inputBlurHandler"
        id="first"
        class="form__input-wrapper-input"
        type="text"
      />
    </div>
    <button class="form-button">
      Add to list
    </button>
  </form>
</template>

<script>
  export default {
    name: "FormInput",
    data() {
      return {
        inputValue: null,
        inputFocused: false
      }
    },
    methods: {
      submitHandler() {
        if (!this.inputValue || this.inputValue.length === 0) {
          return
        }
        this.$emit('submit', this.inputValue);
        this.inputValue = null
      },
      inputFocusHandler() {
        this.inputFocused = true
      },
      inputBlurHandler() {
        this.inputFocused = false
      },
    }
  }
</script>

<style scoped lang="scss">
  .form {
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin: 20px auto 0;
  }

  .form__input-wrapper {
    flex-grow: 1;
    position:relative;
  }

  .form__input-wrapper-label {
    position: absolute;
    left: 0;
    top: 10px;
    color: #999;
    background-color: #fff;
    z-index: 10;
    transition: transform 150ms ease-out, font-size 150ms ease-out;
  }

  .focused .form__input-wrapper-label {
    transform: translateY(-125%);
    font-size: .75em;
  }

  .form__input-wrapper-input {
    position: relative;
    padding: 12px 0px 5px 0;
    width: 100%;
    outline: 0;
    border: 0;
    box-shadow: 0 1px 0 0 #e5e5e5;
    transition: box-shadow 150ms ease-out;

    &:focus {
      box-shadow: 0 2px 0 0 blue;
    }
  }

  .form__input-wrapper-input .filled {
    box-shadow: 0 2px 0 0 lightgreen;
  }

  .form-button {
    margin-left: 15px;
  }
</style>
