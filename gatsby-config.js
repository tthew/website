require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `Embrace your values`,
    description: ``,
    author: `Matt Richards`,
    siteUrl: `https://epitaph.tthew.berlin`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.TTHEW_SITE_CONTENTFUL_SPACE_ID,
        accessToken: process.env.TTHEW_SITE_CONTENTFUL_ACCESS_TOKEN
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `tthew-website`,
        short_name: `tthew`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#000`,
        display: `minimal-ui`,
        icon: `src/images/site-logo.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Staatliches`,
            subsets: [`latin`]
          },
          {
            family: `Montserrat`,
            subsets: [`latin`]
          },
          {
            family: `Lato`,
            subsets: [`latin`]
          }
        ]
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [`gatsby-remark-prismjs`, `gatsby-remark-reading-time`]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
          }
        `
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    "gatsby-plugin-offline"
  ]
};
