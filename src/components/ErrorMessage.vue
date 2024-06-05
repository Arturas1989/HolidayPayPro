<script setup lang="ts">
  
</script>

<template>
  <span>
    <p>
      <slot></slot>
    </p>
  </span>
</template>

<style scoped>
  span{
    min-height: 20px;
    width: fit-content;
    color: red;
    font-size: 12px;
    display: flex;
    align-items: flex-end;
    margin-bottom: 5px;
  }
  p{
    vertical-align: bottom;
    line-height: 1;
  }
</style>