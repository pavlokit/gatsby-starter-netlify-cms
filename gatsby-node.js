const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//     }

//     type SelectOptions {
//       name: [String!]!
//     }

//     type Form {
//       name: String!
//       type: String!
//       heading: String!
//       inputType: String!
//       options: [SelectOptions!]!
//     }

//     type Frontmatter {
//       form: Form
//     }
//   `
//   createTypes(typeDefs)
// }

// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const { createTypes } = actions
//   const typeDefs = [
//     schema.buildObjectType({
//       name: 'MarkdownRemark',
//       fields: {
//         frontmatter: 'Frontmatter!'
//       },
//     }),

//     schema.buildObjectType({
//       name: 'Frontmatter',
//       fields: {
//         title: {
//           type: 'String!',
//           resolve(parent) {
//             return parent.title || '(Untitled)'
//           }
//         },
//         form: {
//           type: 'FormJson!',
//         }
//       }
//     }),

//     schema.buildObjectType({
//       name: 'FormJson',
//       fields: {
//         heading: 'String!',
//         submit: 'String!',
//         // fields: ['FormFields!']
//       },
//     }),

//     schema.buildObjectType({
//       name: 'FormFields',
//       fields: {
//         type: 'String!',
//         inputType: 'String!',
//         name: 'String!',
//         content: {
//           type: 'String!',
//           resolve(parent) {
//             return parent.content || null
//           }
//         },
//         options: {
//           type: ['SelectOption!'],
//           resolve(parent) {
//             return parent.options || []
//           }
//         }
//       },
//     }),

//     schema.buildObjectType({
//       name: 'SelectOption',
//       fields: {
//         name: 'String!',
//       },
//     }),
//   ]

//   createTypes(typeDefs)
// }

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      form: Form
    }
    type Form {
      heading: String
      submit: String
      fields: [FormField]
    }
    type FormField {
      type: String,
      inputType: String,
      name: String,
      content: String,
      options: [SelectOptions]
    }
    type SelectOptions {
      name: String
    }
  `
  createTypes(typeDefs)
}
