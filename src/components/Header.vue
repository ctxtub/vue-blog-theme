<template>
  <b-navbar
   :class="$style.nav">
    <template slot="brand">
      <router-link
        :class="$style.title"
        :to="{ path: '/' }">
        <!-- <img
            src=""
            alt="Lightweight UI components for Vue.js based on Bulma"
        > -->
        {{settings.title}}
      </router-link>
    </template>
    <template slot="start">
      <b-navbar-item
        v-for="(tag, index) in tags"
        :key="index"
        tag="router-link"
        :to="{ path: `/tags/${tag.slug}` }">
        {{tag.name}}
      </b-navbar-item>
    </template>

    <!-- <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </b-navbar-item>
    </template> -->
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['settings', 'tags'])
  }
}
</script>

<style lang="scss" module>
.nav {
  box-shadow: 0 1px 5px rgba(0,0,0,.1);
  .title {
    height: 52px;
    line-height: 52px;
    color: #000;
    font-weight: 700;
    font-size: 20px;
    padding: 0 20px;
  }
}

</style>
