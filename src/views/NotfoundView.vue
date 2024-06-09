<script setup lang="ts">
</script>

<template>
  <main>
    <section class="not-found-section card">
      <h1>404</h1>
      <h2>Oh! Page not found.</h2>
      <a class="to-home" href="/">Go to Homepage</a>
    </section>
  </main>
</template>

<style>
  .not-found-section > h1{
    font-size: 180px;
    line-height: 1;
  }
  .not-found-section{
    padding: 20px;
    max-width: 330px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border-radius: 20px;
  }
  img{
    max-width: 100%;
  }
  .to-home{
    text-decoration: none;
    padding: 10px 30px;
    border-radius: 20px;
    background-color: rgb(62, 182, 243);
    color: white;
  }
  .to-home:hover{
    cursor: pointer;
    background-color: rgba(62, 182, 243, 0.8);
  }
  .to-home:focus{
    border: 1px solid black;
  }
</style>
