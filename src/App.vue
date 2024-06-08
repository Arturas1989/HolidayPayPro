<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ToggleIcon from './components/ToggleIcon.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/holidays">Holidays</RouterLink>
        <RouterLink to="/params">Settings</RouterLink>
        <ToggleIcon />
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: center;
  background: rgb(224, 224, 224);
}
nav {
  display: flex;
  flex-wrap: wrap;
  align-self: center;
}

a {
  text-decoration: none;
  padding: 10px 20px;
  color: black;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
}

a:hover {
  background: lightgray;
  text-decoration: underline;
}

header a.router-link-exact-active {
  background: lightcoral;
}
</style>
