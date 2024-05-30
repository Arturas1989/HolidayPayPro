<script setup lang="ts">
import {useDark, useToggle} from '@vueuse/core';
  const isDark = useDark({
    selector: 'body',
    attribute: 'color-scheme',
    valueDark: 'dark',
    valueLight: 'light',
  });
  const toggleDark = useToggle(isDark);
  const handleChange = () => {
    setTimeout(() => {
      toggleDark()
    },300)
  }
</script>
  
<template>

<div class="toggle">
  <input @change="handleChange()" type="checkbox" class="checkbox" id="checkbox" :checked="isDark">
  <label for="checkbox" class="checkbox-label">
    <span class="ball"></span>
  </label>
</div>
</template>

<style>

.toggle{
  height:fit-content;
  display: flex;
  align-self: center;
  margin-left: 10px;
}
.checkbox {
  opacity: 0;
  position: absolute;
}

.checkbox-label {
  background-color: #111;
  width: 50px;
  height: 26px;
  border-radius: 50px;
  position: relative;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label .ball {
  background-color: #fff;
  width: 22px;
  height: 22px;
  position: absolute;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  transition: transform 0.3s linear;
}

.checkbox:checked + .checkbox-label .ball {
  transform: translateX(24px);
}
</style>
