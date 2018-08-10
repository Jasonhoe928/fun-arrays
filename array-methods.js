var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = null;


let balance = dataset.bankBalances;
hundredThousandairs = balance.filter(obj => {
  return obj.amount > 100000;
});

// console.log(dataset.bankBalances.amount);

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = null;

datasetWithRoundedDollar = balance.map(account => {
  // console.log('account', account);
  let round = 0;
  if(account.amount >= Math.floor(account.amount) + .5) {
    round = Math.ceil(account.amount)
  } else {
    round = Math.floor(account.amount)
  }
  return {
    'amount': account.amount,
    'state': account.state,
    'rounded': round
  }
})



/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
var datasetWithRoundedDime = null;

datasetWithRoundedDime = balance.map(account => {
  let round = 0;
  if(account.amount * 10 >= Math.floor(account.amount * 10) + .5) {
    round = Math.ceil(account.amount * 10)
  } else {
    round = Math.floor(account.amount * 10)
  }
  let newRound = round/10 //does newRound get pushed into datasetWithRoundedDime by the for loop part of map?
  return {
    'amount': account.amount,
    'state': account.state,
    'roundedDime': newRound
  }
})


// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;

sumOfBankBalances = balance.reduce((accum, next) => {
  return Math.round( (accum + Number(next.amount) ) * 100)/100 //why do you need to round? Doesn't specify to.
  // console.log(next)
}, 0)

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohios
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = null;
// sumOfInterests = balance.filter(obj => {
//   if(obj.state === 'WI' || obj.state === 'IL' || obj.state === 'WY' || obj.state === 'OH' || obj.state === 'GA' || obj.state === 'DE') {
//   return Math.round((obj.amount * .189) * 100) / 100;
//   }
// }).reduce((accum, next) => {
//     return Math.round(accum + Number(next.amount * .189) * 100) / 100;
// }, 0)

sumOfInterests = balance.filter(obj => {
  if (obj.state === 'WI' || obj.state === 'IL' || obj.state === 'WY' || obj.state === 'OH' || obj.state === 'GA' || obj.state === 'DE') {
    // console.log('obj.state', obj.state);
    // console.log('obj.amount', obj.amount);
    // console.log(obj.amount*0.189);
    return Math.round((obj.amount * .189)*100)/100 //how does this work with PEMDAS
  }
 }).reduce((accum, next) => {
  return Math.round((accum + Number(next.amount*.189))*100)/100;
 },0)
/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var stateSums = {};


balance.map( item => {
  //  console.log(item.state)
   if (!stateSums.hasOwnProperty(item.state)) {
     stateSums[item.state] = (Math.round(Number(item.amount) * 100))/100;
   } else {
     stateSums[item.state] = (Math.round((stateSums[item.state] + Number(item.amount)) * 100))/ 100;
   }
 })
// console.log('stateSums', stateSums)


/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var sumOfHighInterests = null;

let stateSum = balance.filter(account => {
  if(account.state !== "WI" && account.state !== "IL" && account.state !== "WY" && account.state !== "OH" && account.state !== "GA" && account.state !== "DE") {
    return account;
  }
})
// console.log('statesum', stateSum);
let sumObject = {};
stateSum.map(account => {
  if(!sumObject.hasOwnProperty(account.state)) {
    // console.log('sumObject', sumObject)
    sumObject[account.state] = (Math.round(Number(account.amount) * 100))/100;
  } else {
    sumObject[account.state] = (Math.round((sumObject[account.state] + Number(account.amount)) * 100))/ 100;
  }
})


const valueArr = Object.keys(sumObject).map(e =>{ //found on stackOverflow since Object.values didn't work
  return sumObject[e];
})

// let valueArr = [];
// for(var i in sumObject) {
//   valueArr.push(sumObject[i])
// }
// console.log(valueArr)

let moreThan50k = [];
valueArr.forEach(account => {
  if(account * .189 > 50000) {
    moreThan50k.push(account);
  }
})
const reduceInterest = moreThan50k.reduce((accum, next) => {
  return Math.round((accum + (Number(next) * .189)) * 100)/100;
}, 0)

sumOfHighInterests = reduceInterest;
/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

let keyVal = Object.keys(stateSums).map(key => {
  return {
    'state': key, //state abbreviation
    'amount': stateSums[key] //sum value of specific key at abbreviated state
  }
})
.filter(account => {
  return account.amount < 1000000;
})
.map(account => {
  return account.state;
})
lowerSumStates = keyVal;
 console.log('keyval', keyVal)

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

higherStateSums = Object.keys(stateSums).map(key => {
  return {
    'state': key,
    'amount': stateSums[key]
  }
})
.filter(account => {
  return account.amount > 1000000;
})
.map(account => {
  return account.amount;
})
.reduce((accum, next) => {
  return Math.round((accum + Number(next)) * 100) / 100;
})
/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */




var areStatesInHigherStateSum = null;

const stateFilter = balance.filter(item => {
  if (item.state === "WI" || item.state === "IL" || item.state === "WY" || item.state === "OH" || item.state === "GA" || item.state === "DE") {
    return item;
  }
});
let highMillions = {};
stateFilter.forEach(item => {
  if (!highMillions.hasOwnProperty(item.state)) {
    highMillions[item.state] = (Math.round(Number(item.amount)*100))/100;
  } else {
    highMillions[item.state] = (Math.round((highMillions[item.state] + Number(item.amount))*100))/100; //why add both numbers before round? Isn't highMillions[item.state] already rounded?
  }
})
const keyValHigher = Object.keys(highMillions).map(key => {
  return {
    "state": key,
    "amount": highMillions[key]
  }
})
console.log('keyValHigher', keyValHigher)
let trueOrFalse;
keyValHigher.map(item => {
  if (trueOrFalse === false) {
    return item;
  } else {
    if (item.amount > 2550000) {
      trueOrFalse = true;
      return item;
    } else {
      trueOrFalse = false;
      return item;
    }
  }
}).reduce((item,add) => {
  return (Math.round((item + add)*100))/100;
},0)
areStatesInHigherStateSum = trueOrFalse;





/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  datasetWithRoundedDollar : datasetWithRoundedDollar,
  datasetWithRoundedDime : datasetWithRoundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};


// const smile = require("baseem");

// const arr = [1, 2, 3, 4, 5, 6, 8];

// arr.forEach(number => {
//   console.log(number);
//   return number;
// });

// const myMappedArray = arr.map(number => {
//   console.log(number);
//   return number * 2;
// });

// const filtered = arr.filter(item => {
//   return item % 2;
// });
// console.log("filtered", filtered);
// const added = arr.reduce((acc, next) => {
//   console.log("prev", acc);
//   console.log("next", next);
//   if (next === 3) {
//     return acc;
//   }
//   return [...acc, next * 2];
// }, []);
// console.log("reduced", added);

// const chained = arr
//   .map(num => {
//     return num * 2;
//   })
//   .filter(num => {
//     return num < 10;
//   })
//   .reduce((accum, next) => {
//     return accum + next;
//   });

// console.log("chained", chained);