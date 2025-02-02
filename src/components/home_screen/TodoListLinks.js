import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import {updatedListHandler} from '../../store/database/asynchHandler';
import { firestoreConnect } from 'react-redux-firebase';


class TodoListLinks extends React.Component {
    render() {
        const todoLists = this.props.todoLists;
        console.log(todoLists);
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id}>
                    {/* todolist.id */}
                        <TodoListCard todoList={todoList} index={todoLists.indexOf(todoList)} onClick={updatedListHandler(todoList)}/>
                    </Link>
                ))}
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    updatedList: (todoList) => dispatch(updatedListHandler(todoList)),
  });

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);