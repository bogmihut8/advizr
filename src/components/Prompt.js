import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeActivePrevious, changeActiveNext } from '../store/actions'
import TextQuestion from "./TextQuestion";
import BoolQuestion from "./BoolQuestion";
import ListQuestion from "./ListQuestion";

class Prompt extends Component {
  previousClick = (e) => {
    this.props.previous();
  }
  
  nextClick = (e) => {
    this.props.next();
  }
  
  componentDidMount(){
//     this.props.changeActive("spouseName");
  }
  render() {
    console.log(this.props.state.flow)
    return (
      <div className={this.props.display ? 'prompt show' : 'prompt'}>
        { this.props.state.flow.map((question, index) => {
            if(question.active){
              switch(question.type){
                case 'text':
                  return <TextQuestion key={question.id} {...question} />;
                case 'bool':
                  return <BoolQuestion key={question.id} {...question} />;
                case 'list':
                  return <ListQuestion key={question.id} {...question} />;
                default:
                  return;     
                }
              }

            }
           )
          }
        <div className="control-buttons">
          <button className="previous" onClick={this.previousClick} >Previous</button>
          <button className="next" onClick={this.nextClick}>Next</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    previous: () => dispatch(changeActivePrevious()),
    next: () => dispatch(changeActiveNext())
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prompt)

