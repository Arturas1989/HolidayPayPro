<script setup lang="ts">
  import SubmitButton from './Forms/SubmitButton.vue'
  const props = defineProps(['modelValue']);
  const emit = defineEmits(['update:modelValue']);

  const getStyle = (val: number): 'positive' | 'negative' | 'neutral' => {
    if(val > 0) return 'positive';
    if(val < 0) return 'negative';
    return 'neutral';
  }
</script>

<template>
  <div class="container">
    <table class="card">
      <thead>
        <tr>
          <th>Month</th>
          <th>Salary difference</th>
        </tr>
      </thead>
      <tbody>
        <tr :class="getStyle(data[1])" v-for="data in props.modelValue" :key="data[0]">
          <td>{{ data[0] }}</td>
          <td>{{ data[1] }}</td>
        </tr>
      </tbody>
    </table>
    <SubmitButton @click="emit('update:modelValue', [])">Go back</SubmitButton>
  </div>
</template>

<style>
  .container.card > button{
    margin-left: 5px;
    margin-bottom: 5px;
  }
  .positive{
    background-color: lightgreen;
  }
  .negative{
    background-color: lightcoral;
  }
  .neutral{
    background-color: lightyellow;
  }
</style>