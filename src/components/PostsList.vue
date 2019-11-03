<template>
  <div>
    <div
      :class="$style['card-box']"
      v-for="(postLine, index) in formatPosts"
      :key="index">
      <div
        :class="$style['card-wrap']"
        v-for="(post, index) in postLine"
        :key="index">
        <div :class="$style['card-item']">
          <div
            :class="$style['card-image']"
            :style="{ 'background-image': `url(${post.feature_image})` }">
          </div>
          <div :class="$style['card-content']">
            <p>{{post.plaintext.length > 80 ? `${post.plaintext.substr(0,80)}...` : post.plaintext}}</p>
          </div>
          <div :class="[$style['card-slant'],$style['reverse-slant']]"></div>
          <div :class="$style['card-slant']"></div>
          <div :class="$style['card-intro']">
            <p :class="$style.title">
              {{post.title}}
            </p>
            <p :class="$style.subtitle">
              <b-icon
                pack="far"
                icon="eye"
                size="is-small">
              </b-icon>
              {{post.viewCount}}
            </p>
            <router-link
              :to="{ path: `/post/${post.slug}` }"
              :class="$style.footer">
              阅读全文
              <b-icon
                pack="fas"
                icon="chevron-circle-right"
                size="is-small">
              </b-icon>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['posts']),
    formatPosts () {
      let result = []
      this.posts.forEach((post, index) => {
        const line = Math.floor(index / 3)
        result[line] ? result[line].push(post) : result[line] = [post]
      })
      return result
    }
  }
}
</script>

<style lang="scss" module>
.card-wrap {
  box-sizing: border-box;
  padding: 15px;
  .card-item {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding: 0;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,.04);
    .card-image {
      height: 340px;
      width: 100%;
      background: center center no-repeat #222;
      background-size: cover;
      overflow: hidden;
      margin-bottom: -80px;
      -webkit-box-shadow: inset 0 0 100px rgba(0,0,0,.4);
      box-shadow: inset 0 0 100px rgba(0,0,0,.4);
      background-color: rgba(0,0,0,.5);
    }
    .card-content {
      position: absolute;
      opacity: 0;
      top: 0;
      left: 0;
      right: 0;
      box-sizing: border-box;
      height: 300px;
      padding: 24px;
      text-align: left;
      background-color: rgba(0,0,0,0);
      p {
        position: relative;
        font-size: 14px;
        word-break: break-all;
        opacity: 0;
        color: #fff;
      }
    }
    .card-slant {
      position: absolute;
      z-index: 0;
      right: 0;
      bottom: 50px;
      left: 0;
      width: 110%;
      min-height: 100px;
      transform: rotate(7deg) translate(-10px,0);
      background-color: #fff;
    }
    .reverse-slant {
      transform: rotate(-10deg) translate(10px,-10px);
      opacity: .7;
      box-shadow: none;
      background-color: rgba(0,0,0,.5);
    }
    .card-intro {
      position: relative;
      box-sizing: border-box;
      height: 130px;
      padding: 10px 20px 40px;
      background-color: #fff;
      .title {
        margin-bottom: 10px;
        line-height: 30px;
        font-size: 18px;
        color: #363636;
        font-weight: 600;
      }
      .subtitle {
        line-height: 20px;
        font-size: 14px;
        color: #5f5f5f;
        font-weight: 400;
      }
      .footer {
        position: absolute;
        right: 20px;
        bottom: 20px;
        color: #555;
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
      }
    }
    &:hover {
      .card-image {
        transition: all .5s ease;
        transform: scale(1.1);
        filter: blur(3px);
      }
      .card-content {
        opacity: 1;
        background-color: rgba(0,0,0,.3);
        p {
          opacity: 1;
          animation: fade-in;
          animation-duration: .5s;
        }
      }
    }
  }
}
@media screen and (min-width: 769px) {
  .card-box {
    display: flex;
    .card-wrap {
      flex: 0 0 33.33%;
      width: 33.33%;
    }
  }
}
@keyframes fade-in {
  from {
    top: 10px;
  }
  to {
    top: 0px;
  }
}
</style>
