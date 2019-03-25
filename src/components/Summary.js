import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeAnswer } from '../store/actions'

class Summary extends Component {
  render() {
    return (
      <div className="summary">
        <p className="question">Summary:</p>
        { this.props.state.flow.map((question, index) => {
            console.log(question);
            if(question.answer !== "" && question.answer.length !== 0 ) {
              switch(question.type){
                case 'text':
                  return <p key={index}><span className="info">{question.for.replace(/([A-Z])/g, ' $1').trim()}:</span> {question.answer}</p>;
                case 'bool':
                  return <p key={index}><span className="info">{question.for.replace(/([A-Z])/g, ' $1').trim()}:</span> {question.answer ? "Yes" : "No"}</p>;
                case 'list':
                  return <p key={index}><span className="info">{question.for.replace(/([A-Z])/g, ' $1').trim()}:</span> {question.answer.join(", ")}</p>;
                default:
                  return;     
                }
            }
            }
           )
          }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(
  mapStateToProps,
  null
)(Summary)