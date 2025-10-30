import { parseHash } from './hash-utils';

console.log('#customer:faq ->', parseHash('#customer:faq'));
console.log('#business ->', parseHash('#business'));
console.log('#faq ->', parseHash('#faq'));
console.log("'' ->", parseHash(''));
