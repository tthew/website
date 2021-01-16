import React, { Suspense } from 'react'
import loadable from '@loadable/component'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Hero from '../components/hero'

const About = loadable(() => import('../components/about'))
const Experience = loadable(() => import('../components/experience'))

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title='Freelance Web Development' keywords={[`freelance`, `web developer`, `berlin`]} />
      <Hero />
      <About />
      <Experience />
    </Layout>
  )
}

export default IndexPage
