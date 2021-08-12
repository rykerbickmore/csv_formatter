import React from 'react';

import { Card } from '../components/Card';

export function MainCompare({
  main,
  isActive,
}) {

  

  return (
    <div className={`main-compare ${isActive ? 'highlight' : ''}`}>
      Main Comparision
      {main ? <Card
        data={main}
        cardType={'card'}/> :
        null}
    </div>
  )
}
