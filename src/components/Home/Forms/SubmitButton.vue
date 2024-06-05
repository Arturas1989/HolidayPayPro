<script setup lang="ts"></script>

<template>
  <button><slot></slot></button>
</template>

<style scoped>
button {
  margin-top: 20px;
  align-self: flex-start;
  background-color: rgb(237, 167, 29);
  color: white;
  border: none;
  padding: 7px 15px;
  border-radius: 15px;
  cursor: pointer;
}

button:focus {
  border: 1px solid black;
}
</style>
