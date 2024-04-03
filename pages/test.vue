<script setup>
definePageMeta({
  auth: false
})
const user = useAuthState()
const role = useFetch('/api/user/role')
</script>

<template>
  <div class="why">
    <p>{{ user.data }}</p><br>
    <p>{{ role?.data ?? 'nothing' }}</p><br>
  </div>
</template>
