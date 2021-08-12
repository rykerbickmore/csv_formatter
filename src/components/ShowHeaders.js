import React from 'react';

import { Card } from './Card';

export function ShowHeaders({
  cells,
  handleMainSelect,
  handleDelete,
}) {

  function deleteCard(data, e) {
    handleDelete(data, e)
    e.stopPropagation()
  }


  return (
    <div className="cards">
      {cells?.map((key, index) => {
        return (
          <Card
            key={index}
            cardType={'card'}
            data={key}
            handleMainSelect={handleMainSelect}
            canDelete={true}
            handleDelete={(e) => deleteCard(index, e)}/>
        )
      })}
    </div>
  )
}
