<script setup lang="ts">
definePageMeta({
  auth: false
})
const categories = useFetch('/api/public/category').data
const products = useFetch('/api/public/products').data
</script>

<template>
  <div class="toplevel">
    <Topbar class="topbar" />
    <div v-if="categories !== null" class="sidebar">
      <Categories v-for="category of [categories]" v-bind="category" :key="category?.title ?? 'fail'" />
    </div>
    <div v-else class="sidebar">
      issue retrieving categories
    </div>
    <div class="main">
      <ProductSquare v-for="product of products" v-bind="product" :key="product.productName" />
    </div>
  </div>
</template>

<style scoped>
.toplevel {
  display: grid;
  grid-template-columns: 0fr 2fr;
  grid-template-rows: 0fr 2fr;
  grid-auto-flow: row;
  grid-template-areas:
    "topbar topbar"
    "sidebar main";
}

.topbar {
  grid-area: topbar;
}

.sidebar {
  grid-area: sidebar;
  padding: 1rem;
  width: 16rem;
}

.main {
  grid-area: main;
  padding: 1rem;
  gap: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
}
</style>
