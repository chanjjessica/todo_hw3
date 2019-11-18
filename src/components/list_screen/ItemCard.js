import React from 'react';
import {updatedListHandler} from '../../store/database/asynchHandler';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Modal, Button, Row, Col, Icon } from 'react-materialize';



class ItemCard extends React.Component {

    todoList = this.props.todoList;

    // handleEditItem = (e) => {
    //     const { props, state } = this;
    //     const { firebase } = props;
    //     const {firestore} = props;
    //     const { target } = e;

    //     this.setState(state => ({
    //         ...state,
    //         [target.id]: target.value,
    //     }));
    //     if(target.assigned_to == "assigned_to"){
    //         this.props.todoList.name=target.value;
    //     }
    //     else if (target.description == "description") {
    //         this.props.todoList.description = target.value;
    //     }

    //     props.editItem(this.props.todoList);

    // }

    handleMoveUp = (item, e) => {
        e.preventDefault();
        const { props } = this;
        let index = this.props.todoList.items.indexOf(item);
        console.log(index);
        if (index > 0){
            var top_key = this.todoList.items[index].key;
            var bot_key = this.todoList.items[index-1].key;
            this.todoList.items[index] = this.todoList.items[index-1];
            this.todoList.items[index-1] = item;
            this.todoList.items[index].key = top_key;
            this.todoList.items[index-1].key = bot_key;
            props.updatedList(this.todoList);
            this.forceUpdate();


        }
    }

    handleMoveDown = (item,e ) => {
        e.preventDefault();
        const { props } = this;
        let index = this.props.todoList.items.indexOf(item);
        console.log(index);
        if (index < this.props.todoList.items.length -1){
            // console.log("ansfllskdfjlakjflasjdflajdlfkjslkfjl");
            // console.log(this.todoList.items[index].key);
            // console.log(this.todoList.items[index+1].key);
            var top_key = this.todoList.items[index].key;
            var bot_key = this.todoList.items[index+1].key;
            this.todoList.items[index] = this.todoList.items[index+1];
            this.todoList.items[index+1] = item;
            this.todoList.items[index].key = top_key;
            this.todoList.items[index+1].key = bot_key;
            props.updatedList(this.todoList);
            // console.log("ansfllskdfjlakjflasjdflajdlfkjslkfjl");
            // console.log(this.todoList.items[index].key);
            // console.log(this.todoList.items[index+1].key);
            // console.log(this.todoList);
            this.forceUpdate();

            // console.log("moved down");

        }
    }

    handleDeleteItem = (item,e ) => {
        e.preventDefault();
        const { props } = this;
        let index = this.props.todoList.items.indexOf(item);
        // console.log(this.props.todoList.items.length);
        // console.log(this.todoList);
        for(let i = 0; i < this.todoList.items.length;i++){
            if(this.todoList.items[i].key < this.todoList.items[index].key){ //update keys before current list key
            //   this.props.todoList.items[i].key++;
            }
            if(this.todoList.items[i].key > this.todoList.items[index].key){ //update keys after current list key
                this.todoList.items[i].key= this.todoList.items[i-1].key;
              }
         }

        this.todoList.items.splice(index, 1);


        // console.log(this.todoList);


        props.updatedList(this.todoList);
        // console.log(this.props.todoList.items.length);

        // for (let i=0; i < this.props.todoList.items.length-1; i++){
        //     this.props.todoList.items[i].key = i;
        //     // console.log(this.props.todoList.items[i].key);
        // }

        // console.log(this.props.todoList.items.length);

        console.log(this.todoList);

        this.forceUpdate();

        // console.log("deleted");
        // console.log(this.todoList);

        
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
                
            <div className="card z-depth-0 todo-list-link grey lighten-3 black-text ">
                    <Row className="card-content row"> 
                        <Col className="col s3">
                            
                            <span>{item.description}<br></br></span>
                            <span>
                            <span>Assigned to: {item.assigned_to}</span>

                            </span>

                        </Col>
                        <Col className="col s3"> {item.due_date}</Col>
                        <Col className="col s2" id={statusID} >{statusText}</Col>

                        {/* <Col className="col s4 offset-s11">  */}
                        <Button
                            className="pink lighten-1 pulse"
                            id="fab"
                            floating
                            fab={{direction: 'left'}}
                            large
                            style={{position:'relative'}}
                            waves="light"

                            >

                                <div class="btn-floating" onClick={this.handleMoveUp.bind(this, item)} style={{position:'relative'}, {backgroundColor: this.props.todoList.items.indexOf(item) != 0 ? "red": "gray"}}>
                                    <i class="large material-icons">arrow_upward</i>
                                </div>

                                <div class="btn-floating" onClick={this.handleMoveDown.bind(this,item)} style={{position:'relative'}, {backgroundColor: this.props.todoList.items.indexOf(item) == this.props.todoList.items.length - 1  ? "gray": "yellow"}}>
                                    <i class="large material-icons">arrow_downward</i>
                                </div>

                                <div class="btn-floating blue" onClick={this.handleDeleteItem.bind(this,item)} style={{position:'relative'}}>
                                    <i class="large material-icons">clear</i>
                                </div>
                            
                            </Button>



                        {/* </Col> */}


                    </Row>
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