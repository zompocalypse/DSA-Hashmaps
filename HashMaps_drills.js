const HashMap = require('./HashMap');

HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;

// 1. Create a HashMap Class
function main() {
  const lotr = new HashMap();

  lotr.set('Hobbit', 'Bilbo');
  lotr.set('Hobbit', 'Frodo');
  lotr.set('Wizard', 'Gandalf');
  lotr.set('Human', 'Aragorn');
  lotr.set('Elf', 'Legolas');
  lotr.set('Maiar', 'The Necromancer');
  lotr.set('Maiar', 'Sauron');
  lotr.set('RingBearer', 'Gollum');
  lotr.set('LadyOfLight', 'Galadriel');
  lotr.set('HalfElven', 'Arwen');
  lotr.set('Ent', 'Treebeard');

  console.log(lotr._hashTable); // Missing 2 since we had duplicate keys.

  console.log(lotr.get('Maiar')); // Sauron, Maiar key is being updated to most recent value since the key has to be unique.
  console.log(lotr.get('Hobbit')); // Frodo, Hobbit key is being updated to most recent value since the key has to be unique.

  console.log(lotr); // 24, at 4 (50% capacity), we added 3 more.  continue this pattern until we expanded 21 to 24 (+3).

  lotr.printDisplay();
}

// main();

// 2. WhatDoesThisDo
const WhatDoesThisDo = function () {
  let str1 = 'Hello World.'; // declare str1 as 'Hello World'
  let str2 = 'Hello World.'; // declare str2 as 'Hello World'
  let map1 = new HashMap(); // create new HashMap called 'map1'
  map1.set(str1, 10); // set key, value as str1, 10
  map1.set(str2, 20); // overwrite value of str1 with value 20
  let map2 = new HashMap(); // create new HashMap called 'map2'
  let str3 = str1; // declare str3 the same as str1 or 'Hello World'
  let str4 = str2; // declare str4 the same as str2 or 'Hello World'
  map2.set(str3, 20); // set key, value as str3, 20
  map2.set(str4, 10); // overwrite value of str3 with 10.

  console.log(map1.get(str1)); // 20, str1 is originally set as 10, then overwritten with 20 by the second set, duplicate key overwrites the value
  console.log(map2.get(str3)); // 10, str3 is originally set as 20, then overwritten with 10 by the second set, duplicate key overwrites the value
};

// WhatDoesThisDo();

// 3. Demonstrate understanding of Hash maps

//    3.1 - [22, 88, , , 4, 15, 28, 17, 59, 31, 10]
//    3.2 - [ , [28, 19, 10], 20, 12, , 5, [15, 33], , 17]

// 4. Remove duplicates

function removeDuplicates(str) {
  const remDupes = new HashMap();
  let newStr = '';
  for (let i = 0; i < str.length; i++) {
    remDupes.set(i, str[i]);
  }

  for (let i = 0; i < str.length; i++) {
    if (!newStr.includes(remDupes.get(i))) {
      newStr += str[i];
    }
  }
  return newStr;
}

// console.log(removeDuplicates('google'));
// console.log(removeDuplicates('google all that you think can think of'));

// 5. Any permutation a palindrom

function isPalindrome(str) {
  let countMap = new HashMap();
  let odd = 0;
  // sanitize for case, spaces, and quotations
  str = str.toLowerCase(str).replace(/\s+/g, '').replace(/["']/g, '');
  // loop through the string
  // retrieve duplicate characters
  // add a value for each time a character appears
  // otherwise get the char, and give it a value of 1
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    try {
      let value = countMap.get(char);
      value++;
      countMap.set(char, value);
    } catch (e) {
      countMap.set(char, 1);
    }
  }
  // loop through to check for palindromes
  // return false if the odd is greater than 1
  // else return true
  for (let i = 0; i < str.length; i++) {
    let palindromeCheck = countMap.get(str[i]);
    if (palindromeCheck % 2 !== 0) {
      odd++;
    }
  }
  if (odd > 1) {
    return false;
  }
  return true;
}
// console.log(isPalindrome('acecarr')); // true
// console.log(isPalindrome('north')); // false
// console.log(isPalindrome('engage')); // false
// console.log(isPalindrome('Rotator')); // true
// console.log(isPalindrome("step' on no pets")); // true
// console.log(isPalindrome('We did it')); // false
// console.log(isPalindrome("Don't nod")); // true

// 6. Anagram grouping

function anagramGrouping(strings) {
  let anagramGroup = {};
  strings.forEach((string) => {
    let letters = string.split('').sort();
    if (anagramGroup[letters]) {
      anagramGroup[letters].push(string);
    } else {
      anagramGroup[letters] = [string];
    }
  });
  let keys = Object.keys(anagramGroup);
  keys.forEach((key) => {
    console.log(anagramGroup[key]);
  });
  return anagramGroup;
}
let tester = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];
anagramGrouping(tester);
