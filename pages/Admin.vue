<script setup>
definePageMeta({
  middleware: ['admin', 'auth']
})
const r = await useFetch('/api/admin/users')
</script>

<template>
  <p>
    hi

    {{ r }}
  </p>
</template>
