<script setup lang="ts">
  const props = defineProps<{
    hasErrors: number | undefined
  }>()
  const className = props.hasErrors ? 'error' : 'empty';
</script>

<template>
  <span :class="className">
    <p>
      <slot></slot>
    </p>
  </span>
</template>

<style scoped>
  .error{
    min-height: 20px;
    width: 100%;
    color: red;
    font-size: 12px;
    display: flex;
    align-items: flex-end;
    margin-bottom: 5px;
  }
  .empty{
    min-height: 20px;
    margin-bottom: 5px;
  }
  p{
    vertical-align: bottom;
    line-height: 1;
  }
</style>