import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';

class ItemsList extends React.Component {


    sortTasks = () => {
        if (this.state.increase_task_sorted === false){
        var sorted = this.props.todoList.items;
        sorted.sort((a,b) => {
            return a.description > b.description;
        });
        this.props.todoList.items = sorted;
        this.state.increase_task_sorted = true;
        this.setState({items:sorted});
        }
        else{
            var sorted = this.props.todoList.items;
            // this.props.todoList.items = sorted.reverse();
            sorted.sort((a,b) => {
                return a.description < b.description;
            });
            this.state.increase_task_sorted = false;
            this.setState({items:sorted});
        }
    }

    sortDueDates = () => {
        if (this.state.increase_due_date_sorted === false){
            var sorted = this.props.todoList.items;
            sorted.sort((a,b) => {
                return a.due_date > b.due_date
            });
            this.props.todoList.items = sorted;
            this.state.increase_due_date_sorted = true;
            this.setState({items:sorted});
            }
            else{
                var sorted = this.props.todoList.items;
                // this.props.todoList.items = sorted.reverse();
                sorted.sort((a,b) => {
                    return a.due_date < b.due_date
                });
                this.state.increase_due_date_sorted = false;
                this.setState({items:sorted});
            }
    }

    sortCompleted = () => {
        if (this.state.increase_completed_sorted === false){
        var sorted = this.props.todoList.items;
        sorted.sort((a,b) => {
            return (a.completed === b.completed)? 0: a? -1 : 1;
        });
        this.props.todoList.items = sorted;
        this.state.increase_completed_sorted = true;
        this.setState({items:sorted});
        }
        else{
            var sorted = this.props.todoList.items;
            // this.props.todoList.items = sorted.reverse();
            sorted.sort((a,b) => {
                return (a.completed === b.completed)? 0: a? 1 : -1;
            });
            this.setState({items:sorted});
        }
    }

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
                        <ItemCard todoList={todoList} item={item} />
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