import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import {updatedListHandler} from '../../store/database/asynchHandler';
import { Modal, Button } from 'react-materialize';
import { deleteTodoList } from '../../store/actions/actionCreators';
import {NavLink} from 'react-router-dom';
import {sortTasksHandler, sortDueDatesHandler, sortCompletedHandler} from '../../store/database/asynchHandler';


class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        increase_task_sorted: false,
        increase_due_date_sorted: false,
        increase_completed_sorted : false,
    }


  sortTasks = (list, itemsList) => {
    var n = itemsList.length;
    var sorted = false;
    for (var i=0; i < n-1; i++) {
      for (var j=0; j<n-i-1; j++){
        if (itemsList[j].description > itemsList[j+1].description){
          var temp = itemsList[j].description;
          itemsList[j].description = itemsList[j + 1].description;
          itemsList[j+1].description = temp;
          sorted = true;

        }
      }
    }
    if (sorted == false){
      for (var i=0; i < n-1; i++) {
        for (var j=0; j<n-i-1; j++){
          if (itemsList[j].description < itemsList[j+1].description){
            var temp = itemsList[j].description;
            itemsList[j].description = itemsList[j + 1].description;
            itemsList[j+1].description = temp;
  
          }
        }
      }
    }


    const {props} = this;
    const {firebase} = this;

    props.sortTasks(list, itemsList, firebase);



  }

  sortDueDates = (list, itemsList) => {
    var n = itemsList.length;
    var sorted = false;
    for (var i=0; i < n-1; i++) {
      for (var j=0; j<n-i-1; j++){
        if (itemsList[j].due_date > itemsList[j+1].due_date){
          var temp = itemsList[j].due_date;
          itemsList[j].due_date = itemsList[j + 1].due_date;
          itemsList[j+1].due_date = temp;
          sorted = true;

        }
      }
    }
    if (sorted == false){
      for (var i=0; i < n-1; i++) {
        for (var j=0; j<n-i-1; j++){
          if (itemsList[j].due_date < itemsList[j+1].due_date){
            var temp = itemsList[j].due_date;
            itemsList[j].due_date = itemsList[j + 1].due_date;
            itemsList[j+1].due_date = temp;
  
          }
        }
      }
    }


    const {props} = this;
    const {firebase} = this;

    props.sortDueDates(list, itemsList, firebase);


  }

  sortCompleted = (list, itemsList) => {
    var n = itemsList.length;
    var sorted = false;
    for (var i=0; i < n-1; i++) {
      for (var j=0; j<n-i-1; j++){
        if (itemsList[j].completed > itemsList[j+1].completed){
          var temp = itemsList[j].completed;
          itemsList[j].completed = itemsList[j + 1].completed;
          itemsList[j+1].completed = temp;
          sorted = true;

        }
      }
    }
    if (sorted == false){
      for (var i=0; i < n-1; i++) {
        for (var j=0; j<n-i-1; j++){
          if (itemsList[j].completed < itemsList[j+1].completed){
            var temp = itemsList[j].completed;
            itemsList[j].completed = itemsList[j + 1].completed;
            itemsList[j+1].completed = temp;
  
          }
        }
      }
    }


    const {props} = this;
    const {firebase} = this;

    props.sortCompleted(list, itemsList, firebase);
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

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.deleteTodoList(this.props.todoList.id);
      this.props.history.push('/');

    }



    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        const todoLists = this.props.todoLists;

        // if (todoLists.indexOf(todoList) != 0){
        //   // console.log(this.props.todoList.index);
        //   this.props.updatedList(this.props.todoList);
        // }

        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!todoList)
        return <React.Fragment />
        return (
          
            <div className="container white">
            <form>
                <Modal 
                header="Delete list?" 

                trigger={
                  <div class="btn-floating btn-large pink lighten-1 pulse" id="trash">
                    <i class="large material-icons">delete</i>
                  </div>
                }
                actions={
                  <div>
                    <Button className="left btn-large pink lighten-1" onClick={this.handleSubmit}>CONFIRM</Button>
                    <Button className="right btn-large pink lighten-1" modal="close">CANCEL</Button>


                  </div>
                }
                options= {
                  {opacity: 0.5, inDuration: 600, outDuration:600, startingTop: '25%', endingTop: '25%'}
                }
                >
                  <h5>
                    Are you sure you want to delete this list? <br></br><br></br>
                    <b>This list will not be retrievable.</b>
                  </h5>
                </Modal>
            </form>
                
                <h5 className="grey-text text-darken-3">Todo List</h5>

                {/* <div class="btn-floating btn-large pink lighten-1" id="trash">
                    <i class="large material-icons">delete</i>
                </div> */}

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
                        <div id="list_item_task_header" className="col s3" onClick={() => this.sortTasks(todoList,todoList.items)}>Task</div> 
                        {/* Remember to do onclick for sorting for each header */}
                        <div id="list_item_due_date_header" className="col s3" onClick={() => this.sortDueDates(todoList, todoList.items)}>Due Date</div>
                        <div id="list_item_status_header" className="col s2" onClick={() => this.sortCompleted(todoList, todoList.items)}>Status</div>
                    </div>
                <ItemsList todoList={todoList} />
    
                </div>
                  <div>
                    <NavLink to={"/todoList/"+todoList.id+"/newItem"} todoList={todoList}
                      className="btn-floating btn-large pink lighten-1" id="add_card"
                    >
                    <i className="material-icons">add</i>
                    </NavLink>
                  </div>
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
  // if (todoLists.indexOf(todoList) != 0)
  //   this.props.updatedList(todoList);
  return {
    todoList,
    todoLists,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
    updatedList: (todoList) => dispatch(updatedListHandler(todoList)),
    deleteTodoList: (todoLists) => dispatch(deleteTodoList(todoLists)),
    sortTasks: (list, itemsList, firebase) => dispatch(sortTasksHandler(list, itemsList, firebase)),
    sortDueDates: (list, itemsList, firebase) => dispatch(sortDueDatesHandler(list, itemsList, firebase)),
    sortCompleted: (list, itemsList, firebase) => dispatch(sortCompletedHandler(list, itemsList, firebase)),
  });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);