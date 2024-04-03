<script setup>
definePageMeta({
  middleware: ['admin', 'auth']
})
const users = await useFetch('/api/admin/users')
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.user_id">
      {{ user.user_id }}
      {{ user.user_role }}
    </li>
  </ul>
</template>
