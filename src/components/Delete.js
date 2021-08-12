import React from 'react';

import { Icon } from 'semantic-ui-react';

export function Delete({
  onClick,
}) {

  return (
    <div className='delete-btn'>
      <Icon
        name="trash"
        onClick={onClick}/>
    </div>
  )
}
