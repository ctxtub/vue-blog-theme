<template>
  <section :class="$style.pagination">
    <b-pagination
      @change="change"
      :total="pagination.total"
      :current.sync="pagination.page"
      :per-page="pagination.limit"
      order="is-centered"
      size="is-small"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page">
    </b-pagination>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      pagination: 'postsPagination'
    })
  },
  methods: {
    change (page) {
      this.$emit('change', page)
    }
  }
}
</script>

<style lang="scss" module>
.pagination {
  max-width: 320px;
  margin: 0 auto 20px auto;
}
</style>
