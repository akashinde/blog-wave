const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  devServer: {
    proxy: {
      '^/blogs': {
        target: 'http://localhost:8181/api/v1/',
        ws: true,
        changeOrigin: true
      },
      '^/authors': {
        target: 'http://localhost:8181/api/v1/',
        ws: true,
        changeOrigin: true
      }
    }
  }
});
