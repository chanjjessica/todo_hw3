import React from 'react';
import {updatedListHandler} from '../../store/database/asynchHandler';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Modal, Button } from 'react-materialize';



class ItemCard extends React.Component {

    todoList = this.props.todoList;

    handleEditItem = (e) => {
        const { props, state } = this;
        const { firebase } = props;
        const {firestore} = props;
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        if(target.assigned_to == "assigned_to"){
            this.props.todoList.name=target.value;
        }
        else if (target.description == "description") {
            this.props.todoList.description = target.value;
        }

        props.editItem(this.props.todoList);

    }

    handleMoveUp = (item) => {
        console.log("this is item");
        console.log(item);
        console.log(this.todoList.items);
        const { props } = this;
        let index = this.props.todoList.items.indexOf(item);
        console.log(index);
        if (index > 0){
            this.todoList.items[index] = this.todoList.items[index-1];
            this.todoList.items[index-1] = item;
            props.updatedList(this.todoList);
            console.log("moved up");
            console.log(this.todoList);

        }
    }

    handleMoveDown = (item) => {
        // console.log("this is item");
        // console.log(item);
        // console.log(this.todoList.items);
        const { props } = this;
        let index = this.props.todoList.items.indexOf(item);
        console.log(index);
        if (index < this.props.todoList.items.length -1){
            this.todoList.items[index] = this.todoList.items[index+1];
            this.todoList.items[index+1] = item;
            props.updatedList(this.todoList);
            console.log("moved down");
            console.log(this.todoList);

        }
    }

    handleDeleteItem = (item) => {

        const { props } = this;
        let index = this.props.todoList.items.indexOf(item);
        console.log(index);
        this.todoList.items.splice(index, 1);
        props.updatedList(this.todoList);
        console.log("deleted");
        console.log(this.todoList);

        
    }
    render() {
        const { item } = this.props;  
        let statusText = "Completed";
        let statusID = "list_item_card_completed";
        if (!item.completed) {
            statusID = "list_item_card_not_completed";
            statusText = "Pending";
        }

        return (
                
            <div className="card z-depth-0 todo-list-link grey lighten-3">
                    <div className="card-content row"> 
                        <div className="col s3">
                            
                            <span>{item.description}<br></br></span>
                            <span>
                            <span>Assigned to: {item.assigned_to}</span>

                            </span>

                        </div>
                        <span className="col s3"> {item.due_date}</span>
                        <span className="col s2" id={statusID} >{statusText}</span>

                        <div className="col s4"> 

                            <Button
                            floating
                            fab={{direction: 'left'}}
                            className="red"
                            large
                            >

                                <div class="btn-floating grey" onClick={()=>this.handleMoveUp(item)} >
                                    <i class="large material-icons">arrow_upward</i>
                                </div>

                                <div class="btn-floating grey" onClick={()=>this.handleMoveDown(item)}>
                                    <i class="large material-icons">arrow_downward</i>
                                </div>

                                <div class="btn-floating  grey" onClick={()=>this.handleDeleteItem(item)}>
                                    <i class="large material-icons">clear</i>
                                </div>

                                <div class="btn-floating pink lighten-1">
                                    <i class="large material-icons">keyboard_arrow_left</i>
                                </div>
                            
                            </Button>

                        </div>


                    </div>
                </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    updatedList: (todoList) => dispatch(updatedListHandler(todoList)),
  });
// export default ItemCard;
export default compose(
    connect(null, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
  )(ItemCard);