import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeAnswer } from '../store/actions'

class ListQuestion extends Component {
  handleOnClick = () => {
    this.props.changeAnswer(this.props.for, this.textInput.value);
  }
  
  render() {
    return (
      <div className="ListQuestion">
        <p>{this.props.question}</p>
        <ul>
          {
            this.props.answer.map((child, index) => <li key={index}>{child}</li> )
          }
        </ul>
          <input type="text" onChange={this.handleOnChange} ref={(textInput) => { this.textInput = textInput }} />
          <input type="button" onClick={this.handleOnClick} value="Add" />
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
)(ListQuestion)
