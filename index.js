import React from "react";
import 'systemjs/dist/system'

function systemImport(output, exportName) {
  return window.System.import(output).then(module => {
    return exportName ? module.default[exportName] : module.default;
  });
}

let loaderCss = {};

function loaderStyle(src) {
  return new Promise((resolve, reject) => {
    if (loaderCss[src]) {
      resolve();
    } else {
      loaderCss[src] = true;
      let link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", src);
      link.addEventListener("load", () => {
        resolve();
      });
      link.addEventListener("error", e => {
        reject(e);
      });
      document.head.appendChild(link);
    }
  });
}


/**
 * 加载js
 * @param {string} name
 */
function loadScript(src, exportName) {
  return systemImport(src, exportName);
}

function loadComponent({ src, exportName, placeholder, errorholder }) {
  class LoadWrapComponent extends React.Component {
    constructor() {
      super();
      this.state = { C: null, isError: false, loaded: false };
      this.isDone = false;
    }
    componentDidUpdate() {
      const { isError, loaded } = this.state;
      if (loaded && !this.isDone) {
        this.isDone = true;
        if (isError) {
          this.props.loadError && this.props.loadError();
        } else {
          this.props.loadSuccess && this.props.loadSuccess();
        }
      }
    }
    componentDidMount() {
      this.loaderComponent();
    }
    async loaderComponent() {
      try {
        const entry = await loadScript(src, exportName);
        if (entry) {
          this.setState({ C: entry, loaded: true })
        } else {
          this.setState({ isError: true, loaded: true });
        }
      } catch (e) {
        console.error(e);
        this.setState({ isError: true, loaded: true });
      }
    }
    render() {
      const { forwardRef, loadSuccess, ...props } = this.props;
      const { C, isError } = this.state;
      return C ? <C {...props} ref={forwardRef} /> : isError ? { errorholder } : { placeholder };
    }
  }
  return React.forwardRef((props, ref) => <LoadWrapComponent {...props} forwardRef={ref} />);
}

function loadDecComponent({ src, exportName, Component, args, errorholder, placeholder }) {
  class LoadWrapComponent extends React.Component {
    constructor() {
      super();
      this.state = { C: null, isError: false, loaded: false };
      this.isDone = false;
    }
    componentDidUpdate() {
      const { isError, loaded } = this.state;
      if (loaded && !this.isDone) {
        this.isDone = true;
        if (isError) {
          this.props.loadError && this.props.loadError();
        } else {
          this.props.loadSuccess && this.props.loadSuccess();
        }
      }
    }
    async componentDidMount() {
      try {
        const dec = await loadScript(src, exportName);
        dec
          ? this.setState({ C: args ? dec(...args)(Component) : dec(Component), loaded: true })
          : this.setState({
            isError: true,
            loaded: true
          });
      } catch (e) {
        console.error(e);
        //TODO 错误处理
        this.setState({ C: Component, isError: true });
      }
    }
    render() {
      const { forwardRef, loadSuccess, ...props } = this.props;
      const { C, isError } = this.state;
      return C ? <C {...props} ref={forwardRef} /> : isError ? { errorholder } : { placeholder };
    }
  }
  return React.forwardRef((props, ref) => <LoadWrapComponent {...props} forwardRef={ref} />);
}

const Loader = {
  loadComponent,
  loadDecComponent,
  loadScript,
  loaderStyle,
};

export default Loader;
