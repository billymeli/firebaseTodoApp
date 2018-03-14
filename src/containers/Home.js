import React, { Component } from 'react';
import {
  fetchTodos
} from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {RaisedButton, Dialog, FloatingActionButton, List} from 'material-ui';
import TodoItem from './TodoItem';
var firebase = require("firebase");



class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: []
    }
    this.showTodoList = this.showTodoList.bind(this);
  }
  componentWillMount() {
    this.props.fetchTodos();
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props ', nextProps);
    console.log('this props ', this.props);
    if ((nextProps.todos.length !== this.props.todos.length) && nextProps.todos.length !== 0) {
      console.log(nextProps.todos);
      this.setState({ todos: nextProps.todos });
    }
  }
  showTodoList() {
    return this.state.todos.map((todo, i) => {
      let description = '';
      if (todo.description.length >= 80) {
        if (i == 1) {
          description = todo.description.slice(0, 83) + '...';
        } else {
          description = todo.description.slice(0, 81) + '...';
        }
        console.log('description ', i, description.length);
      }
      return (
          <TodoItem
            title={todo.title}
            description={description}
            key={i}
          />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="container home-container">
          <div className="row title-row">
            <h1 className="pull-left my-todos-title">My Todos</h1>
            <div className="pull-right button-div">
              <Link to="Todo/new"><FloatingActionButton mini className="icon-m-l"><i className="material-icons">add</i></FloatingActionButton></Link>
              <FloatingActionButton secondary mini className="icon-m-l"><i className="material-icons">create</i></FloatingActionButton>
            </div>
          </div>
          <div className="todo-list-container">
            <List>
              { this.showTodoList() }
            </List>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
}

Home.defaultProps = {
  todos: [],
}

function mapStateToProps(state) {
  console.log('state ', state);
  return {
    authenticated: state.auth.authenticated,
    todos: state.home.todos,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTodos,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
