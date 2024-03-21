const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  // devServer: {
  //   proxy: 'http://localhost:8181/api/v1'
  // },
  devServer: {
    proxy: {
      "^/blogs": {
        target: 'http://localhost:8181/api/v1',
        ws: true,  
        changeOrigin: true,
      },
      "^/authors": {
        target: 'http://localhost:8181/api/v1',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  // pwa: {
  //   name: 'Blog Wave App',
  //   short_name: 'BlogWave',
  //   description: 'Offline First Blog App',
  //   start_url: '/',
  //   display: 'standalone'
  //   // background_color: '#ffffff',
  //   // theme_color: '#41b383',
  //   // icons: [
  //   //   {
  //   //     src: '/img/icons/icon-72x72.png',
  //   //     sizes: '72x72',
  //   //     type: 'image/png',
  //   //   },
  //   //   // Add more icons for different resolutions as needed
  //   // ],
  // },
});