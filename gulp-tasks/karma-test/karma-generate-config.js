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

    // Set chrome tests for Travis CI
    if(process.env.TRAVIS){
      conf.browsers = ['Chrome_travis_ci'];
    }

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
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
    concurrency: Infinity,
  };
}

module.exports = function generateConfig(testFiles) {
  const config = createConfigObject(testFiles);

  return createConfigFileContent(config);
};
