
import { warn } from './util/index'
function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    // 判断环境,以及是否new 关键词创建
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
}

export default Vue;