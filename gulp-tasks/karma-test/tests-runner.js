/* eslint-disable no-underscore-dangle */

// In case this file is required by gulp-organiser
if (typeof window !== 'undefined') {
  const allTestFiles = [];
  const TEST_REGEXP = /(spec|test)\.js$/i;

  // Get a list of all the test files to include
  Object.keys(window.__karma__.files).forEach(file => {
    if (TEST_REGEXP.test(file)) {
      console.log(file);
      // Normalize paths to RequireJS module names.
      // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
      // then do not normalize the paths

      console.log(file);
      const normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
      allTestFiles.push(normalizedTestModule);
    }
  });

  require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
  });
}
