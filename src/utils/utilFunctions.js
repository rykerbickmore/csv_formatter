

/*
This takes in an array of strings and object and then 
removes properties of an object with those strings in them
*/
export function excludeProperties(excludeArr, obj) {
  excludeArr?.forEach(itemToExlude => {
    for (const [key, value] of Object.entries(obj)) {
      if (key.includes(`${itemToExlude} Parent`)) {
        delete obj[key]
      } else if (key.includes(`${itemToExlude} %Parent`)) {
        delete obj[key]
      } else if  (key.includes(`${itemToExlude} PE-A Mean`)) {
        delete obj[key]
      }
    }
  })
  return obj
};

/* 
This function will take in an obj, parent, and child, 
then it will return the obj with the added property of the 
relationship between parent and child
*/

export function addRelationProperty(obj, parent, child) {

  let done = false;
  let currentGroup = child.slice();
  let relation = Number.parseFloat(obj[`${currentGroup} %Parent`]);
  
  
  while (!done) {
    if (obj[`${currentGroup} Parent Name`] === parent) {
      done = true
    } else if (!obj[`${obj[`${currentGroup} Parent Name`]} %Parent`]) {
      relation = ""
      done = true
    } else if (child === parent) {
      relation = 100
      done = true
    } else {
      relation *= obj[`${obj[`${currentGroup} Parent Name`]} %Parent`] / 100
      currentGroup = obj[`${currentGroup} Parent Name`]
    }
  }

  obj[`${child} %${parent}`] = 
    isNaN(relation) ?
      "" :
      relation === "Infinity" ?
        "" :
        typeof relation === "number" ?
          relation.toFixed(3) :
          ""
        
  return obj
}