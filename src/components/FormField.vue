<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from './ErrorMessage.vue';

  const props = defineProps({
    for: String
  })
  const inputRef = ref(null);
  defineExpose({
    inputRef
  })
</script>

<template>
  <div class="input-group">
    <ErrorMessage></ErrorMessage>
    <label :for="props.for"><slot></slot></label>
    <input ref="inputRef" type="text" :id="props.for" required>
  </div>
</template>

<style>
  .input-group, input{
    min-width: 100%
  }
  .input-group{
    display: flex;
    flex-direction: column;
  }
  input{
    align-self: flex-start;
    background: rgb(230, 242, 247);
    border: 0.5px solid lightblue;
    padding: 5px 7px;
  }
  input:focus{
    outline: none;
    box-shadow: rgba(3, 102, 214, 0.2) 0px 0px 0px 3px;
  }
  label{
    line-height: 1.5;
  }
</style>