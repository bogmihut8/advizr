import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeAnswer } from '../store/actions'

class BoolQuestion extends Component {
  handleOnChange = (e) => {
    const value = (e.target.value === "true");
    this.props.changeAnswer(this.props.for, { value: value })
  }
  
  render() {
    return (
      <div className="BoolQuestion">
        <p className="question">{this.props.question}</p>
          <div className="radio-container"><input type="radio" name={this.props.for} value="true" id="r1" checked={this.props.answer ? 'checked' : ''} onChange={this.handleOnChange} /> <label htmlFor="r1"> Yes</label></div>
          <div className="radio-container"><input type="radio" name={this.props.for} value="false" id="r2" checked={!this.props.answer ? 'checked' : ''} onChange={this.handleOnChange} /> <label htmlFor="r2"> No</label></div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAnswer: (question, answer) => dispatch(changeAnswer(question, answer))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(BoolQuestion)
