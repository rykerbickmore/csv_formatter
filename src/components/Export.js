import React from 'react';

import { CSVLink } from 'react-csv';

export function Export({
  details,
  csvData,
  isReady,
}) {


  //TODO this function could be cleaned up, I am sure. 
  //!This should be able to know if there is a "main" calcualtion required. 
  function formatData(details, toCsv) {

    const formattedData = [];

    let main = details.data.find(element => {
      return element.main === true
    });

    toCsv.forEach((arr, i) => {
      for (const [key, value] of Object.entries(arr)) {
        if (key==="Experiment Name" ||
        key==="Specimen Name" ||
        key==="Tube Name" ||
        key==="Record Date") {
          formattedData[i] = Object.assign({}, formattedData[i], {[key]: value})
        }
        details.data.forEach(protein => {
          if (key.includes(`${protein.name} Parent Name`) ||
            key.includes(`${protein.name} %Parent`) ||
            key.includes(`${protein.name} PE-A Mean`)) {
            formattedData[i] = Object.assign({}, formattedData[i], {[key]: value})
          }
        })
      }
    })

    //Get percent of main comparision
    formattedData.forEach((item, i) => {
      for (const [key, value] of Object.entries(item)) {
        if (key.includes("Mean")) {
          let newPair = {
            [`${key.slice(0, -9)} %${main?.name}`] : (item[`${main?.name} PE-A Mean`] / value).toFixed(2)
          }
          formattedData[i] = Object.assign({}, formattedData[i], newPair)
        }
      }
    })

    //Get percent of extra comparisions.
    formattedData.forEach((item, index) => {
      for (let i = 0; i < details.extras.length; i+=2) {
        console.log('i: ', i)
        console.log('squeeeeeb: ', details.extras[i])
        console.log("squid", `${details.extras[i]?.name} PE-A Mean`)
        let newCalculation = (item[`${details.extras[i+1]?.name} PE-A Mean`] / item[`${details.extras[i]?.name} PE-A Mean`]).toFixed(2)

        //console.log('here', newCalculation)
        formattedData[index][[`${details.extras[i+1]?.name} %${details.extras[i]?.name}`]] = newCalculation
      }
    })
    
    return formattedData
    
  }

  if (!isReady) {
     return null
  }


  return (
    
      <CSVLink
        className='export'
        data={formatData(details, csvData)}
        filename={'formatted_csv.csv'}
        onClick={() => formatData(details, csvData)}>
        Download
      </CSVLink>
    
  )
}
