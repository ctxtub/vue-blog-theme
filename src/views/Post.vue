<template>
  <div :class="$style.content">
    <post-content></post-content>
  </div>
</template>

<script>
import PostContent from '@/components/PostContent'

export default {
  components: {
    PostContent
  },
  created () {
    this.getPost(this.$route.params.slug)
  },
  beforeRouteUpdate (to, from, next) {
    this.getPost(to.params.slug)
  },
  methods: {
    getPost (slug) {
      this.$store.dispatch('getPost', slug)
    }
  }
}
</script>

<style lang="scss" module>
.content {
  box-sizing: border-box;
  max-width: 900px;
  padding: 0 30px;
  margin: 0 auto;
}
</style>
