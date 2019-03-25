const data = {
  history : [
    { name: "Bogdan Mihut", status: false, spouseName:null, spouseAge:null, children: false, childrenList:[]},
    { name: "Valeria Chiriac", status: true, spouseName:"Petre", spouseAge:null, children: true, childrenList: ["Mihai", "Toby"]},
    { name: "Dan Petrescu", status: false, spouseName:null, spouseAge:null, children: true, childrenList:["Adi"]},
  ],
  data: [
    { name: "Bogdan Mihut", status: false, spouseName:null, spouseAge:null, children: false, childrenList:[]},
    { name: "Valeria Chiriac", status: true, spouseName:"Petre", spouseAge:null, children: true, childrenList: ["Mihai", "Toby"]},
    { name: "Dan Petrescu", status: false, spouseName:null, spouseAge:null, children: true, childrenList:["Adi"]},
  ]
}

const flow = [
  {id: 1, question: "What is your name?", type: "text", isParent: false, for: "name", active: true, answer: "", previous: null, next: "status"},
  {id: 2, question: "Are you married?", type: "bool", isParent: true, for: "status", active: false, answer: false, previous: "name", next: ["spouseName", "children"]},
  {id: 3, question: "What is your spouse's name?", type: "text", isParent: false, for: "spouseName", active: false, answer: "", previous: "status", next: "spouseAge"},
  {id: 4, question: "What is your spouse's age?", type: "text", isParent: false, for: "spouseAge", active: false, answer: "", previous: "spouseName", next: "children"},
  {id: 5, question: "Do you have children?", type: "bool", isParent: true, for: "children", active: false, answer: false, previous: ["spouseAge", "status"], next: ["childrenList", "summary"]},
  {id: 6, question: "List your children:", type: "list", isParent: false, for: "childrenList", active: false, answer: [], previous: "children", next:'summary'},
  {id: 7, type:"summary", answer:"", for: "summary", active: false, previous: ["children", "childrenList"], next:null}
]

function* rev(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        yield arr[i]
    }
}

const reducer = (state = {data, flow, showPrompt: false, previous: null}, action) => {
  switch (action.type) {
    case 'SHOW_PROMPT':
      return { 
        ...state,
        showPrompt: action.data,
        flow: flow
      };
    case 'CHANGE_ACTIVE_PREVIOUS':
      let newFlowPrevious = [], previousName, showPrompt = true;
      for(let [index, question] of state.flow.entries()) {
        let activePrev = false;

        if(!state.previous) {
          showPrompt = false;
        } else {
          if(question.for === state.previous) {
            activePrev = true;
          }
        }
        
        if(question.active) {
          for(let i=index-1; i>=0; i--) {
            if(state.flow[i].answer !== "" && state.flow[i].answer.length !== 0) {
              previousName = state.flow[i].for;
              break;
            }
          }
        }
        
        newFlowPrevious.push({id: question.id,  question: question.question, for: question.for, isParent: question.isParent, type: question.type, active: activePrev, answer: question.answer, previous: question.previous, next: question.next})
      }
     
      return { 
        ...state,
        flow: [ ...newFlowPrevious ],
        showPrompt: showPrompt,
        previous: previousName
      };
    case 'CHANGE_ACTIVE_NEXT':
      let newFlowNext = [], nextName, previous, newClient = {}, emptyAnswer = false;
      for(let question of state.flow) {
        let activeNext = false;
        if(question.active) {
          previous = question.for;
          
          if(question.answer === "" || question.answer.length === 0) {
             emptyAnswer = true;
          }
          
          if(question.type === 'bool' && question.answer) {
            nextName = question.next[0]
          }
          else if(question.type === 'bool' && !question.answer) {
            nextName = question.next[1]
          }
          else {
            nextName = question.next;
          }
          
          if(emptyAnswer){
            nextName = question.for;
          }
        }
        
        if(question.for === nextName) {
          activeNext = true;
        }

        newClient = { ...newClient, [question.for]: question.answer};
        
        newFlowNext.push({id: question.id,  question: question.question, for: question.for, isParent: question.isParent, type: question.type, active: activeNext, answer: question.answer, previous: question.previous, next: question.next})
      }
      
      if(previous === "summary") {
        return { 
          ...state,
          previous: null,
          showPrompt: false,
          data: {
            history: [ ...state.data.history, newClient ],
            data: [ ...state.data.data, newClient ]
          }
        };
      }
      else {
        return { 
          ...state,
          flow: [ ...newFlowNext ],
          previous: previous,
          showPrompt: true
        };
      }
    case 'CHANGE_ANSWER':
      const newFlowChangeAnswer = [];
      for(let question of state.flow) {
        let answer;
        if(question.for === action.data.for) {
          if(question.type === 'list') {
            let emptyArr = Object.assign([], action.data.arr);
            emptyArr.push(action.data.answer)
            answer = emptyArr;
          }
          else {
            answer = action.data.answer;
          }
        }
        else {
          answer = question.answer;
        }
        
        newFlowChangeAnswer.push({id: question.id,  question: question.question, for: question.for, isParent: question.isParent, type: question.type, active: question.active, answer, previous: question.previous, next: question.next})
      }
      return { 
        ...state,
        flow: [ ...newFlowChangeAnswer ]
      };
    case 'FILTER_CLIENTS':
      return {
        ...state,
        data : {
          history: state.data.history,
          data: state.data.history.filter((item) => item.name.toUpperCase().includes(action.data.toUpperCase()))
        }
      }
    case 'RESET_DATA':
      return {
        ...state,
        data : {
          history: action.data,
          data: action.data
        }
      }
    default:
      return state
  }
}

export default reducer