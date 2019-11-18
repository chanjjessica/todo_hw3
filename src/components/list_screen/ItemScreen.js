import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../store/database/asynchHandler';
import Checkbox from 'react-materialize/lib/Checkbox';
import {addItemHandler, updatedListHandler} from '../../store/database/asynchHandler';

class ItemScreen extends Component {
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
    const length = this.props.todoList.items.length;
    const { target } = e;
    this.setState(state =>({
      ...state,
      [target.id]: target.value,
    }));
    if (target.name == "description"){

      this.state.item.description = target.value;
    }
    if (target.name == "assigned_to")
      this.state.item.assigned_to = target.value;
    if (target.name == "due_date")
      this.state.item.due_date = target.value;

    if (document.getElementById('mySwitch').checked){
      this.state.item.completed = true;
    }
    this.state.item.key = length;
  }

  handleSubmit = (e) => {
      e.preventDefault();
    // console.log(this.state.item.completed);  
    if (this.state.item.description != ""){
        console.log(this.props.todoList);
        this.props.todoList.items.push(this.state.item);
        this.props.addItemHandler(this.props.todoList);
        this.props.updatedListHandler(this.props.todoList);
        this.props.history.push("/todoList/" + this.props.match.params.id);
      
    }
    else {
      window.alert("Cannot create item with no description!");
    }

  }

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push('/todoList/'+this.props.match.params.id);
  }

  render() {
    const { auth, authError } = this.props;


    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Item</h5>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <input className="active" type="text" name="description" id="description" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="assigned_to">Assigned To</label>
            <input className="active" type="text" name="assigned_to" id="assigned_to" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="due_date">Due Date</label>
            <input className="active" type="date" name="due_date" id="due_date" onChange={this.handleChange} />
          </div>
          <div>
            <Checkbox label="Completed" value="false" onChange={this.handleChange} id="mySwitch">
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
  addItemHandler: (todoList) => dispatch(addItemHandler(todoList)),
  updatedListHandler: (todoList) => dispatch(updatedListHandler(todoList)),

});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ItemScreen);