import 'antd/dist/antd.css'
import './styles/index.less'

import { Button, ConfigProvider, Menu } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import React, { ComponentType, lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { routes } from './router'
const pages = import.meta.glob('./pages/*/*')

const transformRoutes = routes.map((route) => ({
  ...route,
  component: lazy(pages[route.component] as () => Promise<{ default: ComponentType }>),
}))
ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <div className="flex items-start">
          <Menu theme="dark" className="w-[200px] h-[100vh]">
            {transformRoutes.map((route) => (
              <Menu.Item className="Item" key={route.path}>
                <Link to={route.path}>{route.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
          <div className="flex-1">
            <Suspense fallback={<div></div>}>
              <Routes>
                {transformRoutes.map((route) => (
                  <Route key={route.path} path={route.path} element={<route.component />} />
                ))}
              </Routes>
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
