function createConfigFileContent(configurationObject) {
  if (!(
    configurationObject
    && configurationObject.basePath
    && configurationObject.files
    && configurationObject.browsers
  )) {
    throw new Error('Invalid karma configuration file');
  }

  return `
  module.exports = function karmaConfig(config) {
    const conf = ${JSON.stringify(configurationObject)};
    conf.logLevel = config.LOG_INFO;

    return config.set(conf);
  };
  `;
}

function createConfigObject(testFiles) {
  const files = testFiles.map(f => ({
    pattern: f,
    included: true,
    serverd: true,
    nocache: true,
  }));

  return {
    basePath: process.cwd(),
    frameworks: ['jasmine'],
    files,
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['Chrome'],
    concurrency: Infinity,
  };
}

module.exports = function generateConfig(testFiles) {
  const config = createConfigObject(testFiles);

  return createConfigFileContent(config);
};
