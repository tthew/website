import React, { Suspense } from 'react'

const Layout = React.lazy(() => import('../components/layout'))
const SEO = React.lazy(() => import('../components/seo'))
const Hero = React.lazy(() => import('../components/hero'))
const About = React.lazy(() => import('../components/about'))
const Experience = React.lazy(() => import('../components/experience'))

const IndexPage = ({ data }) => {
  return (
    <Suspense fallback={() => null}>
      <Layout>
        <SEO title='Freelance Web Development' keywords={[`freelance`, `web developer`, `berlin`]} />
        <Suspense>
          <Hero />
        </Suspense>
        <Suspense>
          <About />
        </Suspense>
        <Suspense>
          <Experience />
        </Suspense>
      </Layout>
    </Suspense>
  )
}

export default IndexPage
