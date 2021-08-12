import React from 'react'
import { Card } from './Card'

export function ExtraCompares({
  isActive,
  data,
  handleClick,
}) {


  function handleRemove(data, e) {
    handleClick(data, e)
  }

  return (
    <div className={`extra-compares ${isActive ? '' : 'highlight'}`}>
      
      <div className="extra-header">
        Extra Comparisions
        <div>
          <div className='mini-card'>*Parent</div>
          <div className='mini-card'>*Child</div>
        </div>
      </div>
      {data?.map((item, index) => {
        return (
          <Card
            key={index}
            cardType={'extra-card'}
            data={item}
            handleMainSelect={(e) => handleRemove(index, e)}/>
        )
      })}
    </div>
  )
}
