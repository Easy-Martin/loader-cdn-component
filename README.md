# 可加载 cdn 的 umd 包

```javascript
import React from "react"
import ReactDOM from "react-dom";
import LoadCDN from 'load-cdn-component'
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import moment from "moment";

//Antd 依赖 umd包依赖全局
window.React = React;
window.PropTypes = PropTypes;
window.ReactDOM = ReactDOM;
window.moment = moment;

LoadCDN.loadStyle("https://cdn.bootcss.com/antd/3.23.6/antd.min.css")
const Button = LoadCDN.loadComponent('https://cdn.bootcss.com/antd/3.23.6/antd.min.js', 'Button')

ReactDOM.render(<Button onClick={() => alert(1)}>测试CDN组件</Button>>, document.getElementById("root"));

```
