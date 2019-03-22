export const addClient = (name, status, spouseName, children) => {
  return {
    type: 'ADD_CLIENT',
    data: { name, status, spouseName, children }
  }
}

export const showPrompt = (bool) => {
  return {
    type: 'SHOW_PROMPT',
    data: bool
  }
}

export const changeActivePrevious = () => {
  return {
    type: 'CHANGE_ACTIVE_PREVIOUS',
    data: {}
  }
}

export const changeActiveNext = () => {
  return {
    type: 'CHANGE_ACTIVE_NEXT',
    data: {}
  }
}

export const changeAnswer = (question, answer) => {
  return {
    type: 'CHANGE_ANSWER',
    data: { for: question, answer }
  }
}