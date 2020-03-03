<template>
  <section :class="$style.wrap">
    <!-- 标题 -->
    <h1 :class="$style.title">
      {{post.title}}
    </h1>
    <!-- 文章信息 -->
    <div :class="$style.data"
         v-show="post.title">
      <span>
        <b-icon pack="far"
                icon="calendar"
                size="is-small">
        </b-icon>
        <time :datetime="post.published_at">
          {{ formatTime(post.published_at, 'yyyy-MM-dd')}}
        </time>
      </span>
      |
      <span>
        <b-icon pack="far"
                icon="folder"
                size="is-small">
        </b-icon>
        <router-link :to="{ path: `/tags/${tag.slug}` }">
          {{tag.name}}
        </router-link>
      </span>
      |
      <span>
        <b-icon pack="far"
                icon="eye"
                size="is-small">
        </b-icon>
        阅读次数：
        {{post.viewCount}}
      </span>
    </div>
    <!-- 文章内容 -->
    <div class="markdown-css"
         v-html="post.html">
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['post']),
    tag () {
      return (this.post && this.post.primary_tag) || {}
    }
  },
  methods: {
    formatTime (date, fmt) {
      date = new Date(date)
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
  }
}
</script>

<style lang="scss" module>
.wrap {
  box-sizing: border-box;
  max-width: 900px;
  padding: 0 30px;
  margin: 0 auto;
}
.title {
  margin: 30px 0 20px;
  color: #222;
  font-size: 21px;
  text-align: center;
}
.data {
  margin: 20px 0 15px;
  font-size: 12px;
  color: #5f5f5f;
  text-align: center;
  a {
    color: #555;
    border-bottom: 1px solid #ccc;
  }
  span {
    padding: 0 5px;
  }
}
</style>
