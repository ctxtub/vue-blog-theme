import Vue from 'vue'
import Vuex from 'vuex'
import GhostContentAPI from '@tryghost/content-api'
import leanCloud from '@/utils/leanCloud'
import CONFIG from '../CONFIG'

Vue.use(Vuex)

const api = new GhostContentAPI(CONFIG.GHOSTCONFIG)

export default new Vuex.Store({
  state: {
    settings: {},
    authors: [],
    tags: [],
    posts: [],
    post: {},
    postsPagination: {}
  },
  mutations: {
    saveSettings (state, settings) {
      state.settings = settings
      // 获取GHOST后台配置后，设置网页Title
      document.title = `${settings.title} - ${settings.description}`
    },
    saveAuthors (state, authors) {
      state.authors = authors
    },
    saveTags (state, tags) {
      state.tags = tags
    },
    savePosts (state, posts) {
      state.posts = posts
      state.postsPagination = posts.meta.pagination
    },
    savePost (state, post) {
      state.post = post
    }
  },
  actions: {
    getSettings (context) {
      api.settings.browse()
        .then(res => {
          context.commit('saveSettings', res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAuthors (context, params = {}) {
      const defaultParams = { limit: 'all' }
      params = Object.assign(defaultParams, params)

      api.authors.browse()
        .then(res => {
          context.commit('saveAuthors', res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getTags (context, params = {}) {
      const defaultParams = { limit: 'all' }
      params = Object.assign(defaultParams, params)
      api.tags.browse()
        .then(res => {
          context.commit('saveTags', res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getPosts (context, params = {}) {
      const defaultParams = {
        limit: 6,
        include: ['tags'],
        formats: ['plaintext'],
        fields: ['id', 'feature_image', 'title', 'published_at', 'slug']
      }
      params = Object.assign(defaultParams, params)

      api.posts.browse(params)
        .then(res => {
          context.commit('savePosts', res)
          // 开启leanCloud服务时，匹配文章阅读量
          if (leanCloud.status) {
            let meta = res.meta
            let ids = res.map(post => post.id)
            // 获取LeanCloud上文章计数
            leanCloud.getPostsCount({ ids })
              .then(count => {
                let result = res.map(item => {
                  item.viewCount = count[item.id]
                  return item
                })
                result.meta = meta
                context.commit('savePosts', result)
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
    },
    getPost (context, slug) {
      api.posts.read({
        include: ['tags'],
        slug
      })
        .then(res => {
          context.commit('savePost', res)
          // 开启leanCloud服务时，获取和上报文章阅读量
          if (!leanCloud.status) return
          leanCloud.addPostCount({
            id: res.id,
            url: window.location.href,
            title: res.title
          })
            .then(count => {
              context.commit('savePost', Object.assign({ viewCount: count }, res))
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
