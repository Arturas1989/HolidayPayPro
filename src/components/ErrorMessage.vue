<script setup lang="ts">
  
</script>

<template>
  <span>
    <p>
      <slot></slot>
    </p>
  </span>
</template>

<style>
  span{
    min-height: 20px;
    color: red;
    font-size: 12px;
    display: flex;
    align-items: flex-end;
  }
  p{
    vertical-align: bottom;
    line-height: 1;
  }
</style>