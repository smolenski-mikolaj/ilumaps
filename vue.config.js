module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.NODE_ENV === 'production' ? 'https://www.ilumaps.pl' : 'http://localhost:5500/ilumaps/public',
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.plugin('copy').tap(options => {
      options[0][0].ignore.push('carts/**')
      options[0][0].ignore.push('orders/**')
      return options
    })
  },
  pwa: {
    themeColor: '#F4C330',
    msTileColor: '#4D5063',
    workboxOptions: {
      exclude: [/.htaccess/, /\.map$/, /.php/],
      skipWaiting: true
    }
  }
}