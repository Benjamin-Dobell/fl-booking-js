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

function createConfigObject(runner, testFiles) {
  const files = [
    runner,
    ...(testFiles.map(f => ({ pattern: f, included: true }))),
  ];

  return {
    basePath: '.',
    frameworks: ['jasmine', 'requirejs'],
    files,
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  };
}

module.exports = function generateConfig(runner, testFiles) {
  const config = createConfigObject(runner, testFiles);

  return createConfigFileContent(config);
};
