import React from "react"
import PropTypes from "prop-types"
import loadable from '@loadable/component'

import Header from './header'
import './layout.css'

const Footer =  loadable(() => import('./footer'))

const Layout = ({ children }) => (
  <div className='container'>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
