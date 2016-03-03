(function FLScheduler(windowObj) {
  var APIGLOBAL;

  if (!(this instanceof FLScheduler)) {
    return new FLScheduler();
  }

  //Create window surrogate to protect the global namespace
  var window = {};
  for (key in windowObj) {
    window[key] = this[key];
    this[key] = this[key];
  }
