import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeAnswer } from '../store/actions'

class BoolQuestion extends Component {
  handleOnChange = (e) => {
    const value = (e.target.value === "true");
    this.props.changeAnswer(this.props.for, value)
  }
  
  render() {
    return (
      <div className="BoolQuestion">
        <p>{this.props.question}</p>
          <input type="radio" name={this.props.for} value="true" checked={this.props.answer ? 'checked' : ''} onChange={this.handleOnChange} /> Yes <br />
          <input type="radio" name={this.props.for} value="false" checked={!this.props.answer ? 'checked' : ''} onChange={this.handleOnChange} /> No
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
    changeAnswer: (question, answer) => dispatch(changeAnswer(question, answer))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoolQuestion)
