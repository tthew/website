import React from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"

import s from './article-page.module.css'

const Article = ({ data }) => (
  <Layout>
    <SEO title={data.contentfulArticle.title} />
    <div className={s.articlePage}>
      {data.contentfulArticle.heroImage && (
        <div className={s.heroImage}>
          <Img fluid={data.contentfulArticle.heroImage.fluid} />
        </div>
      )}

      <article className={s.article}>
        <header>
          <h1>{data.contentfulArticle.title}</h1>
        </header>
        <div className={s.articleMeta}>
          <span className={s.articleMetaDate}>{data.contentfulArticle.createdAt}</span>
          <span className={s.dot}>·</span>
          <span className={s.readingTime}>{data.contentfulArticle.body.childMarkdownRemark.fields.readingTime.text}</span>
        </div>
        <div
          className={s.articleBody}
          dangerouslySetInnerHTML={{
            __html: data.contentfulArticle.body.childMarkdownRemark.html
          }}
        />
        {data.contentfulArticle.tags && data.contentfulArticle.tags.length && (
          <div className={s.articleFooter}>
            <ul className={s.articleMetaTags}>
              {data.contentfulArticle.tags.map(tag => (
                <li className={s.articleMetaTag}>
                  {`#${tag}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
      {/* <div className={s.sidebar}>
      sdsd
      </div> */}
    </div>
  </Layout>
)


export const query = graphql`
  query($slug: String!) {
    contentfulArticle(slug: { eq: $slug }) {
      id
      title
      body {
        childMarkdownRemark {
          html
          fields {
            readingTime {
              text
              minutes
              time
              words
            }
          }
        }
      }
      tags
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
      createdAt(formatString: "MMMM Do, YYYY")
      updatedAt
    }
  }
`

export default Article
