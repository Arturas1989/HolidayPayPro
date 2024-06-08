<script setup lang="ts">
import SubmitButton from '../Home/Forms/SubmitButton.vue'
import HolidayForm from './HolidayForm.vue'
import { inject, ref } from 'vue'
import type { Errors, HolidayFormFields, HolidayFormType } from '@/types/FormFields'

type Modal = {
  show: boolean
  title: string
  buttonText: string
  type: HolidayFormType
}

defineProps<{
  modelValue: Modal
}>()


const errors = ref< Errors | null>(null)
const setErrors = (val: Errors) => {errors.value = val}

const handleEdit = inject<{
  (val: HolidayFormFields, title: string, buttonText: string, type: HolidayFormType): void
}>('handleEdit')!

const emit = defineEmits<{
  (emit: 'update:modelValue', val: Modal): void
}>()

const openModal = () => {
  handleEdit({ month: '', day: '', description: '' }, 'Add the holiday', 'Submit', 'add')
}

const closeModal = () => {
  emit('update:modelValue', { show: false, title: '', buttonText: '', type: '' })
  setErrors({month: [], day: [], description: []})
}
</script>

<template>
  <div>
    <SubmitButton @click="openModal">Add the holiday</SubmitButton>
    <div v-show="modelValue.show" id="myModal" class="modal">
      <div class="modal-content card">
        <div class="modal-header">
          <div class="close-container" @click="closeModal">
            <span class="close">x</span>
          </div>
          <h2>{{ modelValue.title }}</h2>
        </div>
        <div class="modal-body">
          <HolidayForm
            :setErrors="setErrors"
            :errors="errors"
            :buttonText="modelValue.buttonText"
            :closeModal="closeModal"
            :type="modelValue.type"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: fit-content;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: 20px;
  padding: 0;
  border: 1px solid #888;
  width: fit-content;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

.close-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -15px;
  top: -15px;
  border-radius: 50%;
  background-color: lightgreen;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.close-container:hover {
  background-color: lightblue;
}
.close {
  color: white;

  font-size: 28px;
  line-height: 1;
  font-weight: bold;
  transform: translateY(-2px);
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: rgb(109, 109, 236);
  color: white;
  position: relative;
}

.modal-body {
  padding: 16px;
}
</style>
