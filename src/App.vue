<template>
  <div id="app" :class="$style.app">
    <Header :class="$style.header"/>
    <router-view :class="$style.content"/>
    <Footer :class="$style.footer"/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  created () {
    this.$store.dispatch('getSettings')
    this.$store.dispatch('getAuthors')
    this.$store.dispatch('getTags')
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" module>
.app {
  display: flex;
  flex-direction: column;
  .header {
    flex: 0 0 52px;
  }
  .content {
    flex: 1;
    position: relative;
  }
  .footer {
    flex: 0 0 100px;
  }
}
</style>

<style>
html, body, #app {
  height: 100%;
}
body {
  font-size: 14px;
  color: #333;
  background: #fff;
  font-family: Helvetica, Arial, "PingFang SC", "Microsoft YaHei", "WenQuanYi Micro Hei", "tohoma,sans-serif";
}
</style>
