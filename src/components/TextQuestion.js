import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeAnswer } from '../store/actions'

class TextQuestion extends Component {
  handleOnChange = (e) => {
    this.props.changeAnswer(this.props.for, e.target.value)
  }
  
  render() {
    return (
      <div className="TextQuestion">
        <p>{this.props.question}</p>
        <input type="text" defaultValue={this.props.answer} onChange={this.handleOnChange}/>
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
)(TextQuestion)
