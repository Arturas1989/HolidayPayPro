<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from './ErrorMessage.vue';
import type { DataRef } from '@/types/DataRef';

  const props = defineProps<{
    for: string,
    errors: string[] | undefined,
    updateForm: (type: string, input: HTMLInputElement) => void,
    inputVal?: DataRef | string,
  }>()
  const inputRef = ref(null);
  const displayRef = ref(props.inputVal);
  defineExpose({
    inputRef
  })
  const handleChange = () => {
    displayRef.value = (inputRef.value! as HTMLInputElement).value
  }
  const handleBlur = () => {
    props.updateForm(props.for, inputRef.value!)
  }
</script>

<template>
  <div class="input-group">
    <ErrorMessage>{{ errors?.join('; ') }}</ErrorMessage>
    <div class="label-group">
      <label :for="props.for"><slot></slot></label>
      <input :value="displayRef" @change="handleChange" @blur="handleBlur" ref="inputRef" type="text" :id="props.for" required>
    </div>
  </div>
</template>

<style>
  .label-group{
    display: flex;
    width: 100%;
  }
  .input-group{
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  input{
    align-self: flex-start;
    background: rgb(230, 242, 247);
    border: 0.5px solid lightblue;
    padding: 5px 7px;
    max-width: 50%;
  }
  input:focus{
    outline: none;
    box-shadow: rgba(3, 102, 214, 0.2) 0px 0px 0px 3px;
  }
  label{
    line-height: 1.5;
    min-width: 50%;
  }
  table label{
    min-width: 0;
  }
  table input{
    width: 90%;
    max-width: none;
  }
  table .label-group{
    justify-content: center;
  }
</style>