import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { NavLink, Redirect } from 'react-router-dom';


class ItemsList extends React.Component {
    

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    {/* item.key = item.id; */}
                    return (
                        <NavLink to={"/todoList/"+todoList.id+"/"+item.key+"/edit"}
                todoList={todoList} key={todoList.id}       
                        > 
                        <ItemCard todoList={todoList} item={item} />
                        </NavLink>
                    );})
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    // console.log('helloooooooooo');

    console.log(ownProps);
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);