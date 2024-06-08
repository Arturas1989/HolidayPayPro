<script setup lang="ts">
  defineProps<{
    isUpdated: boolean
  }>() 
</script>

<template>
  <div v-show="isUpdated" class='updated card'>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<style>

  .updated{
    width: 100%;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightgreen;
    animation: fadeIn ease 4s;
    animation-fill-mode: forwards;
  }

  @keyframes fadeIn {
    0%, 100% {
      opacity: 0;
    }

    50% {
      opacity: 1
    }
  }
</style>