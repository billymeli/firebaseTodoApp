import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'material-ui';

  const style =  {
    margin: 10
  };

export const LetterAvatar = (props) => {
  return (
    <Avatar style={style}>T</Avatar>
  );
}

export default LetterAvatar;
