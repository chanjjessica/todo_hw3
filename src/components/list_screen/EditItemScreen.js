import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../store/database/asynchHandler';
import Checkbox from 'react-materialize/lib/Checkbox';
import {editItemHandler} from '../../store/database/asynchHandler';

class EditItemScreen extends Component {
  todoList = this.props.todoList;

  state = {
    item: {description: '',
    assigned_to: '',
    due_date: '',
    completed: false,
    key: ''
    }
  }

  handleChange = (e) => {
    this.state.item.key = this.props.match.params.key;
    const { target } = e;
    const index = this.state.item.key;

    this.setState(state =>({
      ...state,
      [target.id]: target.value,
    }));
    if (target.name == "description"){
        this.state.item.description = target.value;
        this.props.todoList.items[index].description = target.value;

    }
    if (target.name == "assigned_to"){
        this.state.item.assigned_to = target.value;
        this.props.todoList.items[index].assigned_to = target.value;
    }
    if (target.name == "due_date"){
        this.state.item.due_date = target.value;
        this.props.todoList.items[index].due_date = target.value;
    }
    if (document.getElementById('mySwitch').checked){
        this.props.todoList.items[index].completed = true;
        this.state.item.completed = true;
    }
    else{
        this.props.todoList.items[index].completed = false;
        this.state.item.completed = false;
    }
    // this.state.key = length;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.state.item.key = this.props.match.params.key;

    // console.log(this.state.item.completed);
    const index = this.state.item.key;
    console.log(index);

    if (this.props.todoList.items[index].description != ""){
        this.props.editItemHandler(this.props.todoList);
        this.props.history.push("/todoList/" + this.props.match.params.id);
    }
      
    

  }

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push('/todoList/'+this.props.match.params.id);
  }

  render() {
    const { auth, authError } = this.props;
    const todoList = this.props.todoList;
    const key = this.props.match.params.key;
    if (!todoList)
    return <React.Fragment/>;
    if (!this.props.auth.uid) {
        return <Redirect to ="/"/>;
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Item</h5>
          <div className="input-field active">
            <label htmlFor="description">Description</label>
            <input className="active" type="text" name="description" id="description" onChange={this.handleChange} 
            value = {this.props.todoList.items[key].description}/>
          </div>
          <div className="input-field active">
            <label htmlFor="assigned_to">Assigned To</label>
            <input className="active" type="text" name="assigned_to" id="assigned_to" onChange={this.handleChange} 
            value = {this.props.todoList.items[key].assigned_to}/>
          </div>
          <div>
            <label htmlFor="due_date active">Due Date</label>
            <input className="active" type="date" name="due_date" id="due_date" onChange={this.handleChange} 
            value = {this.props.todoList.items[key].due_date}/>
          </div>
          <div>
            <Checkbox label="Completed"  onChange={this.handleChange} id="mySwitch"
            checked = {this.props.todoList.items[key].completed}>
            </Checkbox>
          </div>
          <div className="input-field row">
            <button type="submit" className="btn pink lighten-1 z-depth-0 col s3" value={this.todoList}>Submit</button>

            <button type="cancel" className="btn pink lighten-1 z-depth-0 col s3 offset-s1" onClick={this.handleCancel} value={this.todoList}>Cancel</button>
          </div>

        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => ({

//   auth: state.firebase.auth,
//   authError: state.auth.authError,

// });

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(todoList)
  todoList.id = id;
  // if (todoLists.indexOf(todoList) != 0)
  //   this.props.updatedList(todoList);
  return {
    todoList,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  editItemHandler: (todoList) => dispatch(editItemHandler(todoList)),

});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(EditItemScreen);