import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addClient, showPrompt, filterClients, resetData } from './store/actions'
import Client from "./components/Client";
import Prompt from "./components/Prompt";
import './App.css';

class App extends Component {
  handleAddClient = () => {
    this.props.showPrompt(true);
  }

  handleOnKeyDown = (e) => {
    if(e.keyCode === 8 || e.target.value === "") {
      this.props.resetData(this.props.state.data.history);
    }
    this.props.filterClients(e.target.value);
  }
  
  render() {
    return (
      <div className="App">
        <button className="add-client" onClick={this.handleAddClient}>Add client</button>
        <div className="clients">
          <div className="label">Clients:</div>
          <input type="text" defaultValue={this.props.filter} onKeyDown={this.handleOnKeyDown} onChange={this.handleOnKeyDown} placeholder="Client name"/>
          {this.props.state.data.data.map((client, index) => <Client key={index} name={client.name} status={client.status ? "married" : "single"} children={client.childrenList} /> )}
        </div>
        <Prompt display={this.props.state.showPrompt}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addClient: (name, status, spouseName, children) => dispatch(addClient(name, status, spouseName, children)),
    showPrompt: (display) => dispatch(showPrompt(display)),
    filterClients: (filterValue) => dispatch(filterClients(filterValue)),
    resetData: (data) => dispatch(resetData(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
