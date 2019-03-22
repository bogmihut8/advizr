const data = [
  { name: "Bogdan Mihut", status: "single", spouseName:null, children:[]},
  { name: "Valeria Chiriac", status: "married", spouseName:"Petre", children: ["Mihai", "Toby"]},
  { name: "Dan Petrescu", status: "single", spouseName:null, children:["Adi"]},
]

const flow = [
  {id: 1, question: "What is your name?", type: "text", for: "name", active: true, answer: "", previous: null, next: "maried"},
  {id: 2, question: "Are you maried?", type: "bool", for: "maried", active: false, answer: false, previous: "name", next: ["spouseName", "children"]},
  {id: 3, question: "What is your spouse's name?", type: "text", for: "spouseName", active: false, answer: "", previous: "maried", next: "spouseAge"},
  {id: 4, question: "What is your spouse's age?", type: "text", for: "spouseAge", active: false, answer: "", previous: "spouseName", next: "children"},
  {id: 5, question: "Do you have children?", type: "bool", for: "children", active: false, answer: false, previous: ["spouseAge", "maried"], next: ["childrenList", null]},
  {id: 6, question: "List your children:", type: "list", for: "childrenList", active: false, answer: [], previous: "children", next:null},
]

function* rev(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        yield arr[i]
    }
}

const reducer = (state = {data, flow, showPrompt: false}, action) => {
  switch (action.type) {
    case 'ADD_CLIENT':
      return { 
        ...state,
        data: [
          ...state.data,
          action.data
        ]
      };
    case 'SHOW_PROMPT':
      return { 
        ...state,
        showPrompt: action.data
      };
    case 'CHANGE_ACTIVE_PREVIOUS':
      let newFlowPrevious = [], previousName;
      for(let question of rev(state.flow)) {
        let activePrev = false;
        if(question.active) {
          if(question.type === 'bool' && question.answer) {
            previousName = Array.isArray(question.previous) ? question.previous[0] : question.previous;
          }
          else if(question.type === 'bool' && !question.answer) {
            previousName = Array.isArray(question.previous) ? question.previous[1] : question.previous;
          }
          else {
            previousName = question.previous;
          }
        }

        if(question.for === previousName) {
          activePrev = true;
        }
        
        newFlowPrevious.push({id: question.id,  question: question.question, for: question.for, type: question.type, active: activePrev, answer: question.answer, previous: question.previous, next: question.next})
      }
      newFlowPrevious = newFlowPrevious.reverse();
      return { 
        ...state,
        flow: [ ...newFlowPrevious ]
      };
    case 'CHANGE_ACTIVE_NEXT':
      let newFlowNext = [], nextName;
      for(let question of state.flow) {
        let activeNext = false;
        if(question.active) {
          if(question.type === 'bool' && question.answer) {
            nextName = question.next[0]
          }
          else if(question.type === 'bool' && !question.answer) {
            nextName = question.next[1]
          }
          else {
            nextName = question.next;
          }
        }
        
        if(question.for === nextName) {
          activeNext = true;
        }
        
        newFlowNext.push({id: question.id,  question: question.question, for: question.for, type: question.type, active: activeNext, answer: question.answer, previous: question.previous, next: question.next})
      }

      return { 
        ...state,
        flow: [ ...newFlowNext ]
      };
    case 'CHANGE_ANSWER':
      const newFlowChangeAnswer = [];
      for(let question of state.flow) {
        let answer;
        if(question.for === action.data.for) {
          if(question.type === 'list') {
            question.answer.push(action.data.answer)
            answer = question.answer;
          }
          else {
            answer = action.data.answer;
          }
        }
        else {
          answer = question.answer;
        }
        
        newFlowChangeAnswer.push({id: question.id,  question: question.question, for: question.for, type: question.type, active: question.active, answer, previous: question.previous, next: question.next})
      }
      return { 
        ...state,
        flow: [ ...newFlowChangeAnswer ]
      };
    default:
      return state
  }
}

export default reducer