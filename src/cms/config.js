const backendConfig = {
  name: "git-gateway",
  branch: "master",
  commit_messages: {
    create: "Create {{collection}} “{{slug}}”",
    update: "Update {{collection}} “{{slug}}”",
    delete: "Delete {{collection}} “{{slug}}”",
    uploadMedia: "[skip ci] Upload “{{path}}”",
    deleteMedia: "[skip ci] Delete “{{path}}”"
  }
};

const formConfig = {
  label: "Form",
  name: "form",
  widget: "object",
  required: false,
  fields: [
    {
      label: "Heading",
      name: "heading",
      widget: "string",
      required: false,
    },
    {
      label: "Submit text",
      name: "submit",
      widget: "string",
      required: false,
    },
    {
      label: "Fields",
      name: "fields",
      widget: "list",
      types: [
        {
          label: "Input",
          name: "input",
          widget: "object",
          fields: [
            {
              label: "Name",
              name: "name",
              widget: "string"
            },
            {
              label: "Type",
              name: "inputType",
              widget: "select",
              options: [
                {
                  label: "Text",
                  value: "text"
                },
                {
                  label: "Date",
                  value: "date"
                },
                {
                  label: "Email",
                  value: "email"
                },
                {
                  label: "Number",
                  value: "number"
                }
              ]
            }
          ]
        },
        {
          label: "Select",
          name: "select",
          widget: "list",
          fields: [
            {
              label: "Name",
              name: "name",
              widget: "string"
            },
            {
              label: "Options",
              name: "options",
              widget: "list",
              fields: [
                {
                  label: "Option name",
                  name: "name",
                  widget: "string"
                }
              ]
            }
          ]
        },
        {
          label: "Checkbox group",
          name: "checkboxGroup",
          widget: "list",
          fields: [
            {
              label: "Checkbox",
              name: "options",
              widget: "list",
              fields: [
                {
                  label: "Checkbox label",
                  name: "name",
                  widget: "string"
                }
              ]
            }
          ]
        },
        {
          label: "Text",
          name: "text",
          widget: "object",
          fields: [
            {
              label: "Content",
              name: "content",
              widget: "markdown"
            }
          ]
        }
      ]
    }
  ]
};

const blogConfig = {
  name: "blog",
  label: "Blog",
  folder: "src/pages/blog",
  create: true,
  slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
  fields: [
    {
      label: "Template Key",
      name: "templateKey",
      widget: "hidden",
      default: "blog-post"
    },
    {
      label: "Title",
      name: "title",
      widget: "string"
    },
    {
      label: "Publish Date",
      name: "date",
      widget: "datetime"
    },
    {
      label: "Description",
      name: "description",
      widget: "text"
    },
    {
      label: "Featured Post",
      name: "featuredpost",
      widget: "boolean"
    },
    {
      label: "Featured Image",
      name: "featuredimage",
      widget: "image"
    },
    {
      label: "Body",
      name: "body",
      widget: "markdown"
    },
    {
      label: "Tags",
      name: "tags",
      widget: "list"
    },
    {
      ...formConfig
    }
  ]
}

const landingPageConfig = {
  file: "src/pages/index.md",
  label: "Landing Page",
  name: "index",
  fields: [
    {
      label: "Template Key",
      name: "templateKey",
      widget: "hidden",
      default: "index-page"
    },
    {
      label: "Title",
      name: "title",
      widget: "string"
    },
    {
      label: "Image",
      name: "image",
      widget: "image"
    },
    {
      label: "Heading",
      name: "heading",
      widget: "string"
    },
    {
      label: "Subheading",
      name: "subheading",
      widget: "string"
    },
    {
      label: "Mainpitch",
      name: "mainpitch",
      widget: "object",
      fields: [
        {
          label: "Title",
          name: "title",
          widget: "string"
        },
        {
          label: "Description",
          name: "description",
          widget: "text"
        }
      ]
    },
    {
      label: "Description",
      name: "description",
      widget: "string"
    },
    {
      label: "Intro",
      name: "intro",
      widget: "object",
      fields: [
        {
          label: "Heading",
          name: "heading",
          widget: "string"
        },
        {
          label: "Description",
          name: "description",
          widget: "text"
        },
        {
          label: "Blurbs",
          name: "blurbs",
          widget: "list",
          fields: [
            {
              label: "Image",
              name: "image",
              widget: "image"
            },
            {
              label: "Text",
              name: "text",
              widget: "text"
            }
          ]
        }
      ]
    },
    {
      label: "Main",
      name: "main",
      widget: "object",
      fields: [
        {
          label: "Heading",
          name: "heading",
          widget: "string"
        },
        {
          label: "Description",
          name: "description",
          widget: "text"
        },
        {
          label: "Image1",
          name: "image1",
          widget: "object",
          fields: [
            {
              label: "Image",
              name: "image",
              widget: "image"
            },
            {
              label: "Alt",
              name: "alt",
              widget: "string"
            }
          ]
        },
        {
          label: "Image2",
          name: "image2",
          widget: "object",
          fields: [
            {
              label: "Image",
              name: "image",
              widget: "image"
            },
            {
              label: "Alt",
              name: "alt",
              widget: "string"
            }
          ]
        },
        {
          label: "Image3",
          name: "image3",
          widget: "object",
          fields: [
            {
              label: "Image",
              name: "image",
              widget: "image"
            },
            {
              label: "Alt",
              name: "alt",
              widget: "string"
            }
          ]
        }
      ]
    }
  ]
}

const aboutPageConfig = {
  file: "src/pages/about/index.md",
  label: "About",
  name: "about",
  fields: [
    {
      label: "Template Key",
      name: "templateKey",
      widget: "hidden",
      default: "about-page"
    },
    {
      label: "Title",
      name: "title",
      widget: "string"
    },
    {
      label: "Body",
      name: "body",
      widget: "markdown"
    }
  ]
}

const productPageConfig = {
  file: "src/pages/products/index.md",
  label: "Products Page",
  name: "products",
  fields: [
    {
      label: "Template Key",
      name: "templateKey",
      widget: "hidden",
      default: "product-page"
    },
    {
      label: "Title",
      name: "title",
      widget: "string"
    },
    {
      label: "Image",
      name: "image",
      widget: "image"
    },
    {
      ...formConfig
    },
    {
      label: "Heading",
      name: "heading",
      widget: "string"
    },
    {
      label: "Description",
      name: "description",
      widget: "string"
    },
    {
      label: "Intro",
      name: "intro",
      widget: "object",
      fields: [
        {
          label: "Heading",
          name: "heading",
          widget: "string"
        },
        {
          label: "Description",
          name: "description",
          widget: "text"
        },
        {
          label: "Blurbs",
          name: "blurbs",
          widget: "list",
          fields: [
            {
              label: "Image",
              name: "image",
              widget: "image"
            },
            {
              label: "Text",
              name: "text",
              widget: "text"
            }
          ]
        }
      ]
    },
    {
      label: "Main",
      name: "main",
      widget: "object",
      fields: [
        {
          label: "Heading",
          name: "heading",
          widget: "string"
        },
        {
          label: "Description",
          name: "description",
          widget: "text"
        },
        {
          label: "Image1",
          name: "image1",
          widget: "object",
          fields: [
            {
              label: "Image",
              name: "image",
              widget: "image"
            },
            {
              label: "Alt",
              name: "alt",
              widget: "string"
            }
          ]
        },
        {
          label: "Image2",
          name: "image2",
          widget: "object",
          fields: [
            {
              label: "Image",
              name: "image",
              widget: "image"
            },
            {
              label: "Alt",
              name: "alt",
              widget: "string"
            }
          ]
        },
        {
          label: "Image3",
          name: "image3",
          widget: "object",
          fields: [
            {
              label: "Image",
              name: "image",
              widget: "image"
            },
            {
              label: "Alt",
              name: "alt",
              widget: "string"
            }
          ]
        }
      ]
    },
    {
      label: "Testimonials",
      name: "testimonials",
      widget: "list",
      fields: [
        {
          label: "Quote",
          name: "quote",
          widget: "string"
        },
        {
          label: "Author",
          name: "author",
          widget: "string"
        }
      ]
    },
    {
      label: "Full_image",
      name: "full_image",
      widget: "image"
    },
    {
      label: "Pricing",
      name: "pricing",
      widget: "object",
      fields: [
        {
          label: "Heading",
          name: "heading",
          widget: "string"
        },
        {
          label: "Description",
          name: "description",
          widget: "string"
        },
        {
          label: "Plans",
          name: "plans",
          widget: "list",
          fields: [
            {
              label: "Plan",
              name: "plan",
              widget: "string"
            },
            {
              label: "Price",
              name: "price",
              widget: "string"
            },
            {
              label: "Description",
              name: "description",
              widget: "string"
            },
            {
              label: "Items",
              name: "items",
              widget: "list"
            }
          ]
        }
      ]
    }
  ]
}

const config = {
  backend: {
    ...backendConfig
  },
  local_backend: true,
  media_folder: "static/img",
  public_folder: "/img",
  collections: [
    {
      ...blogConfig
    },
    {
      name: "pages",
      label: "Pages",
      files: [
        {
          ...landingPageConfig
        },
        {
          ...aboutPageConfig
        },
        {
          ...productPageConfig
        }
      ]
    }
  ]
};

export default config;
