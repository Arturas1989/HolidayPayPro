<script setup lang="ts">
  import MonthResults from '@/components/MonthResults.vue';
  import SalaryForm from '@/components/SalaryForm.vue';
  import { computed } from 'vue';

  const model = defineModel<[string, number][]>();
  const showRef = computed(() => !model.value?.length);
</script>

<template>
  <main>
    <section>
      <SalaryForm v-show="showRef"  v-model="model"/>
      <MonthResults v-show="!showRef"  v-model="model"/>
    </section>
  </main>
</template>

<style>
main {
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: center;
  
}
</style>
