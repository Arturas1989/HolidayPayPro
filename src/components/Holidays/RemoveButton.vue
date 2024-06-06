<script setup lang="ts">
import ToolTip from '../ToolTip.vue';

  
</script>

<template>
  
  <button class="remove tooltip">
    <ToolTip>Remove a holiday</ToolTip>
    x
  </button>
</template>

<style scoped>
  .remove{
    background-color: lightsalmon;
    cursor: pointer;
  }
</style>