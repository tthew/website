import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import pageStyles from './page.module.css'

const Page = ({ data }) => (
  <Layout>
    <SEO title={data.contentfulPage.title} />
    <div className={pageStyles.page}>
      <div className={pageStyles.primaryContent}>
        <h1>{data.contentfulPage.title}</h1>
        <div
            dangerouslySetInnerHTML={{
            __html: data.contentfulPage.body.childMarkdownRemark.html
          }}
        />
      </div>
    </div>
  </Layout>
)

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      body {
        childMarkdownRemark {
          html
        }
      }
      slug
    }
  }
`

export default Page
