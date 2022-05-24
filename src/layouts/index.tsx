import { Menu } from 'antd'
import React, { ComponentType, lazy, Suspense } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
const pages = import.meta.glob('../pages/*/*')
import { routes } from '../router'

const transformRoutes = routes.map((route) => ({
  ...route,
  component: lazy(pages[route.component] as () => Promise<{ default: ComponentType }>),
}))
export default function Layout() {
  return (
    <BrowserRouter>
      <div className="flex items-start">
        <Menu theme="dark" className="w-[200px] h-[100vh]" defaultSelectedKeys={[location.pathname]}>
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
  )
}
