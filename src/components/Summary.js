import React, { Component } from 'react'
import { connect } from 'react-redux'

class Summary extends Component {
  render() {
    return (
      <div className="summary">
        <p className="question">Summary:</p>
        { this.props.state.flow.map((question, index) => {
            if(question.answer !== "" && question.answer.length !== 0 ) {
              let questionFor = <span className="info">{question.for.replace(/([A-Z])/g, ' $1').trim()}:</span>;
              switch(question.type){
                case 'text':
                  return <p key={index}>{questionFor} {question.answer}</p>;
                case 'bool':
                  return <p key={index}>{questionFor} {question.answer ? "Yes" : "No"}</p>;
                case 'list':
                  return <p key={index}>{questionFor} {question.answer.join(", ")}</p>;
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