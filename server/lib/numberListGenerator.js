
function checkNumbers(numbers, sill, floor, steps) {
  if(numbers.length !== steps) return false;
  let sum = numbers.reduce(function(acc, val) { return acc + val; }, 0);
  // console.log("SUM: " + sum);
  return sum <= sill && sum >= floor;
}


function generate(numbers = [5,2,1,0.4,0,5, 1.2, 3, 0.8, 1.5], steps = 48, total= 140) {
  // let numbers = [5,2,1,0.4,0,5, 1.2, 3, 0.8, 1.5];
  // let total = 140;
  let errorRate = 0;
  // let steps = 48;

  let sill = total * ((100 + errorRate) / 100)
  let floor = total * ((100 - errorRate) / 100)
  let numbersmem = [];

  let tries = 0;

  while(true) {
    tries ++;
    const randomElement = numbers[Math.floor(Math.random() * numbers.length)];
    if(numbersmem.length >= steps) {
      numbersmem.shift();
    }
    numbersmem.push(randomElement);
    // console.log(numbersmem)
    if(checkNumbers(numbersmem, sill, floor, steps))  {
      // console.log(JSON.stringify(numbersmem))
      let sum = numbersmem.reduce(function(acc, val) { return acc + val; }, 0);
      // console.log("SUM: " + ~~(sum))
      // console.log("LENGTH: " + (numbersmem.length))
      // console.log("tries: " + (tries))
      return  numbersmem;
      break;
    }
  }
}

module.exports = generate;
