import React from 'react'
import { connect } from 'react-redux';
import todoJson from './TestTodoListData.json'
import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';


class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('todoLists').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('todoLists').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        const firebase = getFirebase();
        todoJson.todoLists.forEach(todoListJson => {
            fireStore.collection('todoLists').add({
                    key: todoListJson.key,
                    name: todoListJson.name,
                    owner: todoListJson.owner,
                    items: todoListJson.items,
                    last_updated: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);