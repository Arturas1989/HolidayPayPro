<script setup lang="ts"></script>

<template>
  <span class="tooltip-text card">
    <slot></slot>
  </span>
</template>

<style scoped>
.tooltip .tooltip-text {
  visibility: hidden;
  min-width: 130px;
  background-color: rgba(3, 135, 178, 0.8);
  color: #fff;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  transform: translateX(-50%);
  left: 0;
  top: -30px;
  z-index: 1;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
}
</style>
