/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   return Promise.all([
//     new Promise((resolve, reject) => {
//       graphql(`
//         {
//           allContentfulArticle {
//             edges {
//               node {
//                 slug
//               }
//             }
//           }
//         }
//       `).then(result => {
//         result.data.allContentfulArticle.edges.forEach(({ node }) => {
//           createPage({
//             path: `/words/${node.slug}`,
//             component: path.resolve(`./src/templates/article-page.js`),
//             context: {
//               slug: node.slug,
//             },
//           })
//         })
//       resolve()
//       })
//     }),
//     new Promise((resolve, reject) => {
//       graphql(`
//         {
//           allContentfulPage {
//             edges {
//               node {
//                 slug
//               }
//             }
//           }
//         }
//       `).then(result => {
//         result.data.allContentfulPage.edges.forEach(({ node }) => {
//           createPage({
//             path: `/${node.slug}`,
//             component: path.resolve(`./src/templates/page.js`),
//             context: {
//               slug: node.slug,
//             },
//           })
//         })
//         resolve()
//       })
//     })
//   ])
// }
