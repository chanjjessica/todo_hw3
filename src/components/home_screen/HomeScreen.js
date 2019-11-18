import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import {newListHandler} from '../../store/database/asynchHandler'

class HomeScreen extends Component {

    handleNewList = (e) => {
        const { props, state } = this;
        const { firebase } = props;
        const {firestore} = props;
        let list = {
        "name": "Unknown",
        "owner": "Unknown",
        "items": [],
        // "last_updated": firebase.firestore.FieldValue.serverTimestamp()
        "last_updated": new Date()

    };
        // const { props, state } = this;
        // const { firebase } = props;
        props.newList(this.props.todoLists, firebase, list);
        // props.updatedList(this.props.todoList);

    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        // todoLists: state.firestore.data

    };
};

const mapDispatchToProps = dispatch => ({
    newList: (todoLists, firebase, list) => dispatch(newListHandler(todoLists, firebase, list))
  });

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists' , orderBy:['last_updated',"desc"]},
    ]),
)(HomeScreen);