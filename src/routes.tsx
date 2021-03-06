import React, { ReactElement } from 'react'

import Login from './components/pages/Login'
import ForgotPassword from './components/pages/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword'

import User from './components/pages/User'
import Users from './components/pages/Users'

import Product from './components/pages/Product'
import Products from './components/pages/Products'

import Options from './components/pages/Options'
import About from './components/pages/About'
import TermsOfUse from './components/pages/TermsOfUse'

export default (): ReactElement => {
  const routes: {
    [key: string]: any
  } = {
    '/login': () => <Login />,
    '/options': () => <Options />,
    '/forgot-password': () => <ForgotPassword />,
    '/reset-password': () => <ResetPassword />,
    '/users': () => <Users />,
    '/user': () => <User />,
    '/product': () => <Product />,
    '/products': () => <Products />,
    '/about': () => <About />,
    '/terms-of-use': () => <TermsOfUse />
  }

  const path = location.pathname
  return routes[path] ? routes[path]() : <Login />
}
