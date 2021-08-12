

/*
This takes in an array of strings and object and then 
removes properties of an object with those strings in them
*/
export function excludeProperties(excludeArr, obj) {
  excludeArr.forEach(itemToExlude => {
    for (const [key, value] of Object.entries(obj)) {
      if (key.includes(itemToExlude)) {
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
  let relation = (obj[child] * obj[`${parent} %Parent`]) / 100
  obj[`${child.slice(0, -8)} %${parent}`] = 
    isNaN(relation) ? 
      "" : 
      relation === "Infinity" ?
        "" :
        relation

  return obj
};