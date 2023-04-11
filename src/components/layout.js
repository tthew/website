import React from "react"
import PropTypes from "prop-types"

import Header from './header'
import Footer from './footer'

import './layout.css'

const Layout = ({ children }) => (
  <div className='container'>
    <Header />
    <main id='main' role='main'>
      {children}
    </main>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
