import React from 'react';

import { Delete } from './Delete';

export function Card({
  data,
  handleMainSelect,
  cardType,
  canDelete,
  handleDelete,
}) {

  


  return (
    <div className={`${cardType} ${data.main ? 'main-card' : ''}`}
      onClick={handleMainSelect}>
        <div>
          <h3>{data.name}</h3>
            {canDelete ? 
              <Delete
                onClick={handleDelete}/> :
              null}
        </div>
    </div>
  )
}
