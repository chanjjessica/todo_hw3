import React from 'react';

class ItemCard extends React.Component {
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
                        <div className="col s4">
                            
                            <span>{item.description}<br></br></span>
                            <span>
                            <span>Assigned to: {item.assigned_to}</span>

                            </span>

                        </div>
                        <span className="col s3"> {item.due_date}</span>
                        <span className="col s3" id={statusID} >{statusText}</span>

                    </div>
                </div>
        );
    }
}
export default ItemCard;