
import { noop } from 'share/util.js'
export let warn = noop
export let tip = noop
export let generateComponentTrace = () => null;
export let formatComponentName = () => null;

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined';
  const classifyRE = /(?:^|[-_])(\w)/g;
  const classify = str => str
    .replace(classifyRE, c => c.toUpperCase())
    .replace(/[-_]/g, '')
  debugger;
  warn = (msg, vm) => {
    const trace = vm ? generateComponentTrace(vm) : ''
    if (config.warnHandler) {
      // 如果有用户自定义的错误处理函数,使用call调用,并把当前的vm实例和消息调用栈传出去
      config.warnHandler.call(null, msg, vm, trace)
    } else if (hasConsole && (!config.silent)) {
      console.error(`Vue warn : ${msg}${trace}`)
    }
  }
  tip = (msg, vm) => {
    if (hasConsole && (!config.silent)) {
      console.warn(`[Vue tip]: ${msg}` + (
        vm ? generateComponentTrace(vm) : ''
      ))
    }
  }

  formatComponentName = (vm, includeFile) => {
    if (vm.$root === vm) {
      return '<Root>'
    }
    const options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {}
    let name = options.name || options._componentTag
    const file = options.__file
    if (!name && file) {
      const match = file.match(/([^/\\]+)\.vue$/)
      name = match && match[1]
    }

    return (
      (name ? `<${classify(name)}>` : `<Anonymous>`) +
      (file && includeFile !== false ? ` at ${file}` : '')
    )
  }

  generateComponentTrace = vm => {
    if (vm._isVue && vm.$parent) {
      const tree = []
      let currentRecursiveSequence = 0
      while (vm) {
        if (tree.length > 0) {
          const last = tree[tree.length - 1]
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++
            vm = vm.$parent
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence]
            currentRecursiveSequence = 0
          }
        }
        tree.push(vm)
        vm = vm.$parent
      }
      return '\n\nfound in\n\n' + tree
        .map((vm, i) => `${
          i === 0 ? '---> ' : repeat(' ', 5 + i * 2)
          }${
          Array.isArray(vm)
            ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)`
            : formatComponentName(vm)
          }`)
        .join('\n')
    } else {
      return `\n\n(found in ${formatComponentName(vm)})`
    }
  }
}