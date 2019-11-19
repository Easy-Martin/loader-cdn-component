# 可加载 cdn 的 umd 包

```javascript
import React from "react"
import ReactDOM from "react-dom";
import LoaderCDN from 'loader-cdn-component'

Loader.loadStyle("https://cdn.bootcss.com/antd/3.23.6/antd.min.css")
const Button = Loader.loadComponent('https://cdn.bootcss.com/antd/3.23.6/antd.min.js', 'Button')

ReactDOM.render(<Button />, document.getElementById("root"));

```
