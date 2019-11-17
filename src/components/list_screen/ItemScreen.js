import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../store/database/asynchHandler'

class ItemScreen extends Component {
  state = {
    description: '',
    assigned_to: '',
    due_date: new Date(),
    completed: false,
  }

  handleChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [e.target.id]: e.target.value,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // const { props, state } = this;
    // const { firebase } = props;
    // const newUser = { ...state };

    // props.register(newUser, firebase);
    console.log(this.state);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Register</h5>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="assigned_to">Assigned To</label>
            <input type="text" name="assigned_to" id="assigned_to" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="due_date">Due Date</label>
            <input type="date" name="due_date" id="due_date" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Completed</label>
            <input type="checkbox" class="filled-in" name="completed" id="completed" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button type="submit" className="btn pink lighten-1 z-depth-0">Sign Up</button>
            {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
});

const mapDispatchToProps = dispatch => ({
  register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(ItemScreen);