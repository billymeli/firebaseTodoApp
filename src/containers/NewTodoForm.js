import React, { Component } from 'react';
import {
  onFormTextInputChange,
  onDateInputChange,
  onTimeInputChange,
  saveTodo,
} from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import {RaisedButton, Dialog, FloatingActionButton, TextField, DatePicker, TimePicker} from 'material-ui'
var firebase = require("firebase");



class NewTodoForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      date: '',
      time: '',
    }
    this.formTextInputChange = this.formTextInputChange.bind(this);
    this.dateInputChange = this.dateInputChange.bind(this);
    this.timeInputChange = this.timeInputChange.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  formTextInputChange(event) {
    this.props.onFormTextInputChange(event.target.name, event.target.value);
  }
  dateInputChange(e, date) {
    console.log('e and date ', e, date);
    this.props.onDateInputChange(e, date);
  }
  timeInputChange(e, time) {
    console.log('e and time ', e, time);
    this.props.onTimeInputChange(e, time);
  }
  onSaveClick() {
    const formData = {
      title: this.props.title,
      description: this.props.description,
      date: this.props.date,
      time: this.props.time,
    }
    this.props.saveTodo(formData);
  }


  render() {
    return (
      <div>
        <div className="container home-container">
          <div className="row title-row">
            <h1 className="pull-left h2-title">New Todo</h1>
          </div>
          <div className="text-fields-container">
            <TextField
              fullWidth
              multiLine
              hintText="title"
              name="title"
              value={this.props.title}
              onChange={this.formTextInputChange}
            />
            <br/>
            <TextField
              fullWidth
              multiLine
              rows={3}
              hintText="description"
              name="description"
              value={this.props.description}
              onChange={this.formTextInputChange}
            />
            <br/>
            <DatePicker
              fullWidth
              hintText="Date"
              name="date"
              onChange={this.dateInputChange}
              value={this.props.date}
            />
            <br/>
            <TimePicker
              fullWidth
              hintText="Time"
              name="time"
              onChange={this.timeInputChange}
              value={this.props.time}
            />
          <br/>
          <div className="save-button-row">
          <RaisedButton
            primary
            buttonStyle={{ color: "white" }}
            onClick={this.onSaveClick}
          >
          Save
          </RaisedButton>
          </div>
          </div>
        </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
  console.log('state ', state);
  return {
    authenticated: state.auth.authenticated,
    title: state.newTodo.title,
    description: state.newTodo.description,
    date: state.newTodo.date,
    time: state.newTodo.time,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onFormTextInputChange,
    onDateInputChange,
    onTimeInputChange,
    saveTodo,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
