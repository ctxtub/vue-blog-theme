<template>
  <div :class="$style.content">
    <posts-list></posts-list>
    <pagination
      @change="changePage">
    </pagination>
  </div>
</template>

<script>
import PostsList from '@/components/PostsList'
import Pagination from '@/components/Pagination'

export default {
  created () {
    this.getPosts(this.$route.params.slug)
  },
  components: {
    PostsList,
    Pagination
  },
  beforeRouteUpdate (to, from, next) {
    this.getPosts(to.params.slug)
  },
  methods: {
    getPosts (slug) {
      this.$store.dispatch('getPosts', { filter: [ `tag:${slug}` ] })
    },
    changePage (page) {
      this.$store.dispatch('getPosts', { page })
    }
  }
}
</script>

<style lang="scss" module>
.content {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
