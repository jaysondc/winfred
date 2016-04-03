export default class Plugin {
  constructor(options = {}) {
    const defaults = {
      app: null, // the app/main process
      name: '',
      desc: '',
      results: [],
    };
    // merge properties
    Object.assign(this, defaults, options);
  }

  setApp(app) {
    this.app = app;
  }

  getApp() {
    return this.app;
  }
}
