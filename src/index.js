import React from 'react'
import PropsType from 'prop-types'
import './systemjs'

function getCacheKey(path, exportName) {
  if (exportName) {
    return `${path}${exportName}`
  } else {
    return path
  }
}

const SystemImportCache = {}
function systemImport(path, exportName) {
  return window.System.import(output).then(module => {
    const component = exportName ? module.default[exportName] || module[exportName] : module.default
    SystemImportCache[getCacheKey(path, exportName)] = component
    return component
  })
}

let loaderCss = {}

function loaderStyle(path) {
  return new Promise((resolve, reject) => {
    if (loaderCss[path]) {
      resolve()
    } else {
      loaderCss[path] = true
      let link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('type', 'text/css')
      link.setAttribute('href', path)
      link.addEventListener('load', () => {
        resolve()
      })
      link.addEventListener('error', e => {
        reject(e)
      })
      document.head.appendChild(link)
    }
  })
}

/**
 * 加载js
 * @param {string} path
 */
function loadScript(path, exportName) {
  function catchAction(e) {
    console.error('module load error！', path, exportName, e)
    return Promise.reject(e)
  }
  if (!path) {
    return catchAction(new Error('path is not defind!'))
  }

  return systemImport(path, exportName).catch(catchAction)
}

function loadComponent(path, exportName) {
  if (SystemImportCache[getCacheKey(path, exportName)] !== undefined) {
    return SystemImportCache[getCacheKey(path, exportName)]
  }
  class LoadWrapComponent extends React.Component {
    static propTypes = {
      forwardRef: PropsType.any
    }
    constructor() {
      super()
      const entry = SystemImportCache[getCacheKey(path, exportName)]
      this.state = {
        C: entry,
        isError: false,
        loaded: false
      }
    }

    componentDidCatch(error, info) {
      console.error(error, info)
      console.debug(`loaderror -> path:${path}, exportName:${exportName}`)
      this.setState({ isError: true })
    }
    componentDidMount() {
      if (this.state.C) {
        return
      }
      if (!window.ModuleConfig[path]) {
        this.setState({ C: NoPage })
      }
      if (SystemImportCache[getCacheKey(path, exportName)] !== undefined) {
        const entry = SystemImportCache[getCacheKey(path, exportName)]
        return this.setState({
          C: entry,
          loaded: true
        })
      }
      loadScript(path, exportName).then(entry => {
        if (entry) {
          return this.setState({
            C: entry,
            loaded: true
          })
        } else {
          console.error('模块未配置！', path, exportName)
          this.setState({
            isError: true,
            loaded: true
          })
        }
      })
    }
    render() {
      const { forwardRef, ...props } = this.props
      const { C, isError } = this.state
      if (isError) {
        return null
      }

      return C ? <C {...props} ref={forwardRef} /> : null
    }
  }

  return React.forwardRef((props, ref) => <LoadWrapComponent {...props} forwardRef={ref} />)
}

const LoaderCDN = { loadComponent, SystemImportCache, loadScript, loaderStyle }

export { loadComponent, SystemImportCache, loadScript, loaderStyle }

export default LoaderCDN
