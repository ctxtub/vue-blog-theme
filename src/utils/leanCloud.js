import CONFIG from '../../CONFIG'

class LeanCloud {
  constructor (leanAppid, leanAppkey) {
    this.status = false
    this.leanAppid = leanAppid
    this.leanAppkey = leanAppkey
    this.Counter = null
  }

  /**
   * 初始化LeanCloud服务
   *
   * @memberof LeanCloud
   */
  initLeancode () {
    const { leanAppid, leanAppkey } = this
    if (leanAppid && leanAppkey) {
      window.AV.initialize(leanAppid, leanAppkey)
      this.Counter = window.AV.Object.extend('Counter')
      this.status = true
    }
  }

  /**
   * 获取和增加站点访问计数
   *
   * @memberof LeanCloud
   */
  addSiteCount () {
    const { Counter } = this
    let query = new window.AV.Query(Counter)
    query.equalTo('id', '0')

    return new Promise((resolve, reject) => {
      query.find().then((res) => {
        if (res.length > 0) {
          let counter = res[0]
          this.incrementFn(counter)
          resolve(counter.get('time'))
        } else {
          this.setNewCounter({ id: '0', url: '/', title: '/' })
          resolve(1)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * 获取和增加文章访问计数
   *
   * @param {*} { url, title } 文章链接和标题
   * @memberof LeanCloud
   */
  addPostCount ({ id, url, title }) {
    const { Counter } = this
    let query = new window.AV.Query(Counter)

    query.equalTo('id', id)

    return new Promise((resolve, reject) => {
      query.find().then(res => {
        if (res.length > 0) {
          let counter = res[0]
          this.incrementFn(counter)
          resolve(counter.get('time'))
        } else {
          this.setNewCounter({ id, url, title })
          resolve(1)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * 批量获取文章访问计数
   *
   * @param {*} { ids } 文章id数组
   * @memberof LeanCloud
   */
  getPostsCount ({ ids }) {
    const { Counter } = this
    let query = new window.AV.Query(Counter)

    query.containedIn('id', ids)

    return new Promise((resolve, reject) => {
      query.find().then(res => {
        let countResult = {}
        res.map(item => {
          countResult[item.get('id')] = item.get('time')
        })
        resolve(countResult)
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * 上报计数
   *
   * @param {*} counterEntry 计数对象实例
   * @memberof LeanCloud
   */
  incrementFn (counterEntry) {
    counterEntry.increment('time', 1)
    counterEntry.save(null, { fetchWhenSave: true })
      .then(_ => {
        console.log('访问计数+1')
      })
      .catch(err => {
        console.log(err)
      })
  }

  /**
   * 新增条目
   *
   * @param {*} { id, url, title } 文章id、链接、标题
   * @memberof LeanCloud
   */
  setNewCounter ({ id, url, title }) {
    const { Counter } = this
    let newcounter = new Counter()

    newcounter.set('id', id)
    newcounter.set('title', title)
    newcounter.set('url', url)
    newcounter.set('time', 1)

    newcounter.save()
      .then(newcounter => {
        console.log('新条目创建成功', newcounter)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

let entry = new LeanCloud(CONFIG.LEANCODECONFIG.leanAppid, CONFIG.LEANCODECONFIG.leanAppkey)

entry.initLeancode()

export default entry
