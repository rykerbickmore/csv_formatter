import React from 'react';

import { CSVLink } from 'react-csv';
import { addRelationProperty, excludeProperties } from '../utils/utilFunctions';



export function Export({
  details,
  csvData,
  isReady,
}) {

  function formatData(details, toCsv) {
    
    const formattedData = [];

    if (details.extras.length % 2 === 1) {
      return formattedData
    }

    let main = details.data.find(element => {
      return element.main === true
    });

    if (!main) {
      return formattedData;
    }

    //Exclude groups in output
    toCsv.forEach(obj => {
      formattedData.push(excludeProperties(details.toRemove, obj))
    });

    //Main Calculation
    formattedData.forEach((item, i) => {
      for (const [key, value] of Object.entries(item)) {
        if (key.includes('%Parent')) {
          let tempObj = addRelationProperty(item, main.name, key)
          formattedData[i] = tempObj
        }
      }
    })

    //Intermediate Calculations
    formattedData.forEach((item, i) => {
      for (let j = 0; j < details.extras.length; j+=2) { 
        formattedData[i] = addRelationProperty(item, details.extras[j]?.name, `${details.extras[j+1].name} %Parent`)
      }
    })

    return formattedData   
  };

  if (!isReady) {
     return null
  };


  return (
    
      <CSVLink
        className='export'
        data={formatData(details, csvData)}
        filename={`${details.name}.csv`}
        onClick={() => formatData(details, csvData)}>
        Download
      </CSVLink>
    
  )
}
