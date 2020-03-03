<template>
  <footer :class="$style.footer">
    <div>
      © {{new Date().getFullYear()}} {{settings.title}}. All Rights Reserved. | Built with <a href="https://github.com/ctxtub/vue-blog-theme" target="_blank">Ghost</a> and <a href="https://github.com/ctxtub" target="_blank">Tensho Theme</a>. <a href="http://www.beian.miit.gov.cn/" target="_blank" rel="nofollow">{{MIITBEIAN}}</a>
    </div>
    <div
      :class="$style.siteview"
      v-if="viewCount">
      <b-icon
        :class="$style.icon"
        pack="far"
        icon="user"
        size="is-small">
      </b-icon>
      <span>总访问量：{{viewCount}}次</span>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import leanCloud from '@/utils/leanCloud'
const MIITBEIAN = process.env.VUE_APP_CONFIG_MIITBEIAN

export default {
  data () {
    return {
      viewCount: null,
      MIITBEIAN
    }
  },
  created () {
    // 开启leanCloud服务时，获取和上报页面访问次数
    if (!leanCloud.status) return
    leanCloud.addSiteCount()
      .then(res => {
        this.viewCount = res
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    ...mapState(['settings'])
  }
}
</script>

<style lang="scss" module>
  .footer {
    padding: 20px 20px;
    line-height: 24px;
    text-align: center;
    background-color: #fafafa;
    .siteview {
      margin-top: 15px;
      height: 24px;
      line-height: 24px;
      .icon {
        margin-right: 8px;
      }
    }
  }
</style>
