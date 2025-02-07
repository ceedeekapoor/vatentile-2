module.exports = {
  siteMetadata: {
    title: `vatentile`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-image", 
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Elsie Swash Caps\:400,900`
        ],
        display: 'swap'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }
  ]
};
