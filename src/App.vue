<template>
  <div id="app">
    <va-navbar color="primary" shape class="mb-2">
      <template #left>
        <va-navbar-item>
          <p class="font-semibold text-2xl">TODO or NOT TODO</p>
        </va-navbar-item>
      </template>
    </va-navbar>
    <div class="contents">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  components: {},
};
</script>

<style lang="postcss" scoped>
</style>
