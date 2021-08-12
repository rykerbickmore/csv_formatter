import React from 'react'

export function NameFile({
  handleInput,
}) {

  return (
    <div className='name-input'>
      <label>
        File Name:
        <input type="text" onChange={handleInput}/>
        .csv
      </label>
    </div>
  )
}
