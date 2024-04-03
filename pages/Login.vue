<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/'
  }
})
</script>

<template>
  <div class="toplevel">
    <Topbar class="topbar" />
    <div class="sidebar" />
    <div class="login">
      <Login />
    </div>
  </div>
</template>

<style scoped>
.toplevel {
  height: 100vh;
  display: grid;
  grid-template-columns: 0fr 2fr;
  grid-template-rows: 0fr 2fr;
  grid-auto-flow: row;
  grid-template-areas:
    "topbar topbar"
    "login login";
}

.topbar {
  grid-area: topbar;
}

.login {
  grid-area: login;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
