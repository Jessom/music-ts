module.exports = {
  plugins: {
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
      "utf8": false
    },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      "viewportWidth": 375,
      "viewportHeight": 1334,
      "unitPrecision": 3,
      "viewportUnit": "vw",
      "selectorBlackList": [
        ".ignore",
        ".hairlines"
      ],
      "minPixelValue": 1,
      "mediaQuery": false
    },
    "cssnano": {
      "preset": "advanced",
      "autoprefixer": false,
      "postcss-zindex": true
    }
  }
}
