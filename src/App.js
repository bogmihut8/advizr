import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addClient, showPrompt } from './store/actions'
import Client from "./components/Client";
import Prompt from "./components/Prompt";
import './App.css';

class App extends Component {
  handleAddClient = () => {
    this.props.showPrompt(true);
  }
  
  componentDidMount() {
    this.props.addClient("Petre Ispirescu", "married", "Simona", ["Marius"]);
  }
  
  render() {
    return (
      <div className="App">
        <button className="add-client" onClick={this.handleAddClient}>Add client</button>
        <div className="clients">
          <div className="label">Clients:</div>
          {this.props.state.data.map((client, index) => <Client key={index} name={client.name} status={client.status} children={client.children} /> )}
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
    showPrompt: (display) => dispatch(showPrompt(display))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
