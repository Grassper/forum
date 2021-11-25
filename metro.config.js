module.exports = {
  resolver: {
    blockList: [/#current-cloud-backend\/.*/]
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};