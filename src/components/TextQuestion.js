import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeAnswer } from '../store/actions'

class TextQuestion extends Component {
  handleOnChange = (e) => {
    this.props.changeAnswer(this.props.for, { value: e.target.value })
  }
  
  render() {
    return (
      <div className="TextQuestion">
        <p className="question">{this.props.question}</p>
        <input type="text" className={this.props.for === "spouseAge" ? 'age' : ''} defaultValue={this.props.answer} onChange={this.handleOnChange}/>
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
)(TextQuestion)
