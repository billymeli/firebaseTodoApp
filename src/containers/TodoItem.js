import React, { Component } from 'react';
import { ListItem, Avatar, IconButton, IconMenu, MenuItem} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import LetterAvatar from '../components/LetterAvatar';
import PropTypes from 'prop-types';

const style = {
  display: 'inline-flex',
}

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color="#cecece" />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

export class TodoItem extends Component {
  render() {
    return (
      <div className="todo-item">
        <ListItem
          leftIcon={<LetterAvatar/>}
          primaryText={this.props.title}
          secondaryText={this.props.description}
          secondaryTextLines={1}
          rightIconButton={rightIconMenu}
          style={style}
        >
        </ListItem>
      </div>
    );
  }
}

TodoItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}
TodoItem.defaultProps = {
  title: '',
  description: ''
}

export default TodoItem;
