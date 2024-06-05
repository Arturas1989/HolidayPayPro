<script setup lang="ts">
import { ref } from 'vue'
import ErrorMessage from './ErrorMessage.vue'
import type { DataRef } from '@/types/DataRef'

const props = defineProps<{
  for: string
  errors: string[] | undefined
  updateForm: (type: string, input: HTMLInputElement) => void
  inputVal?: DataRef | string
  textArea?: boolean
}>()
const inputRef = ref(null)
const displayRef = ref('');
if(props.inputVal) displayRef.value = props.inputVal as string
defineExpose({
  inputRef
})
const handleChange = () => {
  displayRef.value = (inputRef.value! as HTMLInputElement).value
}
const handleBlur = () => {
  props.updateForm(props.for, inputRef.value!)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    props.updateForm(props.for, inputRef.value!)
    displayRef.value = (inputRef.value! as HTMLInputElement).value
  }
}
</script>

<template>
  <div class="input-group">
    <ErrorMessage>{{ errors?.join('; ') }}</ErrorMessage>
    <div class="label-group">
      <label :for="props.for"><slot></slot></label>
      <input
        v-if="!props.textArea"
        :value="displayRef"
        @keydown="handleKeydown"
        @change="handleChange"
        @blur="handleBlur"
        ref="inputRef"
        type="text"
        :name="props.for"
        :id="props.for"
        required
      />
      <textarea
        v-if="props.textArea"
        :value="displayRef"
        @keydown="handleKeydown"
        @change="handleChange"
        @blur="handleBlur"
        ref="inputRef"
        type="text"
        :name="props.for"
        :id="props.for"
        required
      ></textarea>
    </div>
  </div>
</template>

<style>
textarea{
  resize: none;
  height: 100px;
}
.label-group {
  display: flex;
  width: 100%;
}
.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}
input, textarea {
  align-self: flex-start;
  background: rgb(230, 242, 247);
  border: 0.5px solid lightblue;
  padding: 5px 7px;
  max-width: 50%;
}

.modal-body input, .modal-body textarea{
  min-width: 180px;
  max-width: none;
}
.modal-body label{
  min-width: 120px;
}
input:focus, textarea:focus {
  outline: none;
  box-shadow: rgba(3, 102, 214, 0.2) 0px 0px 0px 3px;
}
label {
  line-height: 1.5;
  min-width: 50%;
}
table label {
  min-width: 0;
}
table input {
  width: 90%;
  max-width: none;
}
table .label-group {
  justify-content: center;
}
</style>
