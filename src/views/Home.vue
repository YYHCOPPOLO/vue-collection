<template>
  <div class="container">
    <Menu :isMenuCollapse="isMenuCollapse" />
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from "../components/menu/Menu.vue";

export default {
  name: "Home",
  components: {
    Menu,
  },
  data() {
    return {
      isMenuCollapse: false,
    };
  },
};
// http://116.62.132.185/cms-api
// http://codercba.prod:8000
// http://111.230.245.205:8880
// http://123.207.32.32:5000/
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
}

.router-view {
  flex: 1;
}
</style>
