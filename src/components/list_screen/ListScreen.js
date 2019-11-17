import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import {updatedListHandler} from '../../store/database/asynchHandler';
import { Modal, Button } from 'react-materialize';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        
        const { props, state } = this;
        const { firebase } = props;
        const {firestore} = props;
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        if(target.name == "name"){
            this.props.todoList.name=target.value;
        }
        else{
            this.props.todoList.owner =target.value;
        }
        props.updatedList(this.props.todoList);

    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!todoList)
        return <React.Fragment />
        return (
            <div className="container white">
                
                <h5 className="grey-text text-darken-3">Todo List</h5>

                <div class="btn-floating btn-large pink lighten-1" id="trash">
                    <i class="large material-icons">delete</i>
                </div>

                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <div id="list_items_container">
                    <div id="list_item_header_card" className="z-depth-0 todo-list-link grey row">
                        <div id="list_item_task_header" className="col s3">Task</div> 
                        {/* Remember to do onclick for sorting for each header */}
                        <div id="list_item_due_date_header" className="col s3">Due Date</div>
                        <div id="list_item_status_header" className="col s2">Status</div>
                    </div>
                <ItemsList todoList={todoList} />
    
                </div>
                <button className="btn-floating btn-large pink lighten-1" id="add_card">
                  {/* <button type="submit" id="list_item_add_card" className="btn pink lighten-1 row">+</button>        */}
                    {/* <a className="btn-floating pink lighten-1"> */}
                      <i className="material-icons ">add</i>
                    {/* </a> */}
                  </button>     
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(todoList)
	todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
    updatedList: (todoList) => dispatch(updatedListHandler(todoList)),
  });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);