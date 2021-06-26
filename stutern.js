function isOldEnoughToDrink(age){
    return age >= 18;
}

function isOldEnoughToDrinkAndDrive(age){
    return false;
}

function isPersonOldEnoughToDrinkAndDrive({age}){
    return false;
}

function computeAverageLengthOfWords(word1,word2){
    let a = word1.length, b = word2.length;
    return (a+b)/2;
}

function transformFirstAndLast(arr=[]){
    let first = arr[0], last = arr[arr.length - 1];
    return {
        [first]: last
    }
}

function getAllKeys(obj={}){
    output = [];
    for(key in obj){
        output.push(key);
    }
    return output;
}

function getProperty(obj, ki){
    return obj[ki];
}

function addProperty(obj, ki){
    obj[ki] = true;
    return obj;
}

var myobj = {
    tobi: 'A man',
    age: 34
}

var names =  ['Queen', 'Elizabeth', 'Of Hearts', 'Beyonce'];
var output = getProperty(myobj, 'tobi');
console.log(output);

output = computeAverageLengthOfWords('code', 'programs');
console.log(output);

output = isOldEnoughToDrink(22);
console.log(output);

output = getAllKeys(myobj);
console.log(output);