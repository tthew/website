import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"

import s from './words.module.css'

const Words = ({ data }) => (
  <Layout>
    <SEO title="Words" />
    <div className={s.writing}>
      <div className={s.primaryContent}>
        <h1>Words</h1>
        <div className={s.articles}>
          {data.allContentfulArticle.edges.map(({ node }) => (
            <div className={s.article}>
              <div className={s.hero}>
                <h2
                  className={s.articleTitle}
                >
                  <Link
                    to={`/words/${node.slug}`}
                  >
                    {node.heroImage && (
                      <Img
                        fluid={node.heroImage.fluid}
                      />
                    )}
                  </Link>
                </h2>
              </div>
              <p className={s.articleTitle}><Link to={`/words/${node.slug}`}>{node.title}</Link></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
)

export const pageQuery = graphql`
  query {
    allContentfulArticle {
      edges {
        node {
          id
          title
          body {
            body
          }
          createdAt
          updatedAt
          slug
          heroImage {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
  }
`

export default Words
