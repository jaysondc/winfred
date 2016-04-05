import { isNumber, isString, isObject, has } from 'lodash';
import math from 'mathjs';

export default function (app) {
  app.createPlugin({
    name: 'Calculator',
    desc: 'Simple calculator functions',
    search: (q) => {
      const results = [];
      try {
        const answer = math.eval(q);
        if (isNumber(answer) || isString(answer) || (isObject(answer) && has(answer, 'value'))) {
          const answerString = answer.toString();
          // Return only if it isn't what user entered
          if (answerString !== q) {
            results.push({
              icon: '', // TODO: create node add-on for retrieving associated icon
              title: answer.toString(),
              subtitle: q,
              desc: '',
            });
          }
        }
      } catch (err) {
        // do nothing...
      }
      return results;
    },
  });
}
