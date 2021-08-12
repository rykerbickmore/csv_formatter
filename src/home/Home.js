import React, { useState, useReducer } from 'react';
import { Export } from '../components/Export';
import { ExtraCompares } from '../components/ExtraCompares';
import { MainCompare } from '../components/MainCompare';
import { ShowHeaders } from '../components/ShowHeaders';
import { Switch } from '../components/Switch';

import { CsvInput } from '../csvFile/CsvInput';

export const ACTIONS = {
  gettingFile: 'getting-file',
  select: 'main', 
  removeExtra: 'extra', 
  changeSelect: 'change-select',
  removeCard: 'remove-card',
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.gettingFile:
      return {mainSelect: true, isReady: false, data: [...action.payload], extras: []};
    case (ACTIONS.select):
      if (state.mainSelect) {
        const newMainIndex = state.data.findIndex(element => element.name === action.payload)
        state.data.forEach(item => {delete item.main})
        state.data[newMainIndex] = {name: action.payload, main: true}
        return Object.assign({}, state, {isReady: true, data: [...state.data]});
      } else {
        state.extras.push({name: action.payload})
        return Object.assign({}, state, {extras: [...state.extras]});
      }
    case (ACTIONS.removeExtra):
      let index = action.payload.index
      if (action.payload.index % 2 === 0) {
        state.extras.splice(index, 2)
      } else {
        state.extras.splice(index - 1, 2)
      }
      return Object.assign({}, state, {extras: [...state.extras]});
    case (ACTIONS.changeSelect):
      return Object.assign({}, state, {mainSelect: !state.mainSelect}); 
    case (ACTIONS.removeCard):
      state.data.splice(action.payload.index, 1)
      return Object.assign({}, state, {data: [...state.data]});
    default:
      return state.data;
  }
}

export function Home({

}) {

  

  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [state, dispatch] = useReducer(reducer, []);


  async function handleFileUpload(e) {
    await e.forEach((item, index1) => {
      if (index1===0) {
        return 
      } else {
        let tempObj = {};
        e[0].data.forEach((key, index2) => {
          tempObj[key] = item.data[index2]
        })
        csvData.push(tempObj)
      }
    })
    setCsvData(csvData);
    const tempCells = Object.keys(csvData[0]).filter(cell => {
      return cell.indexOf("Mean") > -1
    });
    const formattedTempCells = tempCells.map(item => {
      return {name: item.slice(0, -9).trim()}
    })
    setIsFileUploaded(true);
    dispatch({type: ACTIONS.gettingFile, payload: formattedTempCells})
  }





  return (
    <div className="main">

      <div className="column">
        <CsvInput
          handleFileUpload={handleFileUpload}/>
          {isFileUploaded ? <div className='card-header'>
            {state.mainSelect ? 
              <h4>Choose Main Comparision</h4> :
              <h4>Choose Extra Comparisions</h4>} 
            <Switch 
              isActive={state.mainSelect}
              handleClick={() => dispatch({type: ACTIONS.changeSelect})}/>
          </div> :
          null}
        {isFileUploaded ? 
          <ShowHeaders
            cells={state.data}
            handleMainSelect={(e) => dispatch({type: ACTIONS.select, payload: e.target.innerHTML})}
            handleDelete={(data, e) => dispatch({type: ACTIONS.removeCard, payload: {index: data, e: e}})}/> :
          null}
      </div>
      <div className="column">
          <MainCompare
            main={state.data?.find(item => item.main === true)}
            isActive={state.mainSelect}/>
          <ExtraCompares
            isActive={state.mainSelect}
            data={state.extras}
            handleClick={(data, e) => dispatch({type: ACTIONS.removeExtra, payload: {index: data, e: e}})}/>
          {isFileUploaded ? <Export
            details={state}
            csvData={csvData}
            isReady={state.isReady}/> :
            null}
      </div>
    </div>
  )
}
