<template>
  <div>
    <post-content/>
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
