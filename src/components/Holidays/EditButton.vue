<script setup lang="ts">
  import ToolTip from '../ToolTip.vue'
</script>

<template>
  <button class="edit tooltip">
    <ToolTip>Edit a holiday</ToolTip>
    <i class="bi bi-pencil-square"></i>
  </button>
</template>

<style>
  .edit{
    cursor: pointer;
    background-color: lightskyblue
  }
</style>