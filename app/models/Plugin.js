export default class Plugin {
  constructor(options = {}) {
    const defaults = {
      name: '',
      desc: '',
      results: [],
    };
    // merge properties
    Object.assign(this, defaults, options);
  }
}
