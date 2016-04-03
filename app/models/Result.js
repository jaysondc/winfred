export default class Result {
  constructor(options = {}) {
    const defaults = {
      title: '',
      subtitle: '',
      desc: '',
      icon: '',
      data: null,
    };
    // merge properties
    Object.assign(this, defaults, options);
  }
}
