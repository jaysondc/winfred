export default class Result {
  constructor(options = {}) {
    const defaults = {
      title: '',
      subtitle: '',
      desc: '',
      icon: '',
      score: 0,
      data: null,
    };
    // merge properties
    Object.assign(this, defaults, options);
  }
}
