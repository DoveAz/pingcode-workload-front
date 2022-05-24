import 'antd/dist/antd.css'
import './styles/index.less'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import React from 'react'
import ReactDOM from 'react-dom'

import Layout from './layouts'

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Layout></Layout>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
