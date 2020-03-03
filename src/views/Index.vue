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
    this.$store.dispatch('getPosts')
  },
  components: {
    PostsList,
    Pagination
  },
  methods: {
    changePage (page) {
      this.$store.dispatch('getPosts', { page })
    }
  }
}
</script>
