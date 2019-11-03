<template>
  <div
    :class="$style.content">
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

<style lang="scss" module>
.content {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
