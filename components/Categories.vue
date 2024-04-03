<script setup lang="ts">
defineProps<{
  categories: { name: string; checked: boolean }[];
  title: string;
}>()
</script>

<template>
  <div class="alignment">
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="category in categories" :key="category.name">
        <div style="display: flex; gap: 0.5rem">
          <input :id="category.name" v-model="category.checked" type="checkbox">
          <p>{{ category.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.alignment {
  display: flex;
  flex-direction: column;

  h3 {
    font-size: larger;
  }

  ul {
    padding: 1rem;
  }
}

.fix {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

li {
  list-style: none;
}

p {
  margin: 0;
}
</style>
