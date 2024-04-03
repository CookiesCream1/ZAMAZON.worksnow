<script setup lang="ts">
const { signIn } = useAuth()
</script>

<template>
  <form
    class="spinnin login"
    @submit.prevent="signIn('google')"
  >
    <button type="submit" class="submit">
      log in with google
    </button>
  </form>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: antiquewhite;
  color: grey;
  text-shadow: 0 1px 0 #000;
  padding: 2rem;
  border-radius: 2rem;
}

/* https://codepen.io/shshaw/pen/RwJwJJx - slightly modified */
.spinnin {
  --border-angle: 0turn;
  --main-bg: conic-gradient(
    from var(--border-angle),
    #213,
    #112 5%,
    #112 60%,
    #213 95%
  );

  border: solid 5px transparent;
  border-radius: 2em;
  --gradient-border: conic-gradient(
    from var(--border-angle),
    transparent 25%,
    #08f,
    #f03 99%,
    transparent
  );

  background: var(--main-bg) padding-box, var(--gradient-border) border-box,
    var(--main-bg) border-box;

  background-position: center center;

  animation: bg-spin 3s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
}

@keyframes bg-spin {
  to {
    --border-angle: 1turn;
  }
}

@property --border-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0turn;
}

.postItem {
  position: relative;
}

.loginInput {
  padding: 0.5rem;
  background-color: transparent;
  border-bottom: 1px solid grey;
}

.submit {
  background-color: transparent;
  color: grey;
  border: 0;
}

input {
  all: unset;
}
</style>
