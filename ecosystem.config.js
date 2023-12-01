module.exports = {
    apps : [{
      name: 'CalidadAPI',
      script: 'build/index.js',
      watch: true,
      watch_delay: 1000,
      ignore_watch : ["node_modules", "src"],
      watch_options: {
        "followSymlinks": false
      }
    }]
  };