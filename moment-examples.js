const moment = require('moment');
const now = moment();

// We can also use valueOf() instead of format()

console.log(now.valueOf());

let timestamp = 1445475456;

let timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.format('HH:mm a'));
console.log(timestampMoment.local().format());
console.log(timestampMoment.local().format('HH:mm a'));

// console.log(now.format());

// now.subtract(1, 'year'); //Give -1 year from current year like current year is 2022 after this it
                            // it displays 2021 because of '1' parameter

// console.log(now.format());
// console.log(now.format('DD/MM/YYYY')); //17/01/2022
// console.log(now.format('hh:mm:ss a')); //05:29:29 --> a used for am and pm

// console.log(now.format('MMM Do, YYYY')); //Jan 17th, 2022


console.log(now.format('X')); //gives seconds from 1 Jan, 1970
console.log(now.format('x')); //gives miliseconds from 1 Jan, 1970