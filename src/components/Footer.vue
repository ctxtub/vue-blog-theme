<template>
  <footer :class="$style.footer">
    <div class="$style.copyright">
      © 2019 {{settings.title}}. All Rights Reserved. | Built with <a href="https://ghost.org/" target="_blank">Ghost</a> and <a href="https://github.com/ctxtub" target="_blank">Tensho Theme</a>. <a href="http://www.miitbeian.gov.cn/" target="_blank">{{miitbeian}}</a>
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
import CONFIG from '../../CONFIG'

export default {
  data () {
    return {
      viewCount: null,
      miitbeian: CONFIG.MIITBEIAN
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
    text-align: center;
    background-color: #fafafa;
    .siteview {
      height: 24px;
      line-height: 24px;
      .icon {
        margin-right: 8px;
      }
    }
  }
</style>
