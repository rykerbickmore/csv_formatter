import React from 'react';

import { Checkbox } from 'semantic-ui-react';

export function Switch({
  isActive,
  handleClick,
}) {

  return (
    <div className='switch'>
      <Checkbox
        toggle
        checked={isActive}
        onClick={handleClick}
        label="Extra/Main"/>
    </div>
  )
}
