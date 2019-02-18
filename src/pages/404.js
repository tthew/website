import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import pageStyles from '../templates/page.module.css'

const NotFoundPage = () => (
  <Layout>
    <SEO title='404: Not found' />
    <div className={pageStyles.page}>
      <div className={pageStyles.primaryContent}>
        <h1>NOT FOUND</h1>
        <p>That's funny. You tried to visit a URL that doesn't exist.</p>
        <p>The content may have been removed, or perhaps you mistyped something?</p>
        <p><Link to='/'>Back to the Home page</Link></p>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
