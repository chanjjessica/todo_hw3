import React from 'react';
import { Link } from 'react-router-dom';
import {updatedListHandler} from '../../store/database/asynchHandler';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';


class TodoListCard extends React.Component {

    

    render() {
        const { todoList } = this.props;
        // console.log(todoList.key);
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">


                    <span className="card-title">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;
