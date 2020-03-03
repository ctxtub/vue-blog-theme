<template>
  <div>
    <posts-list/>
    <pagination @change="changePage"/>
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
