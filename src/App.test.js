import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect, assert } from 'chai';
import App from './App';
import Prompt from './components/Prompt';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store/reducer'

const store = createStore(rootReducer)

it('renders without crashing', () => {
  shallow(<App />);
});

const wrapper = mount(<Provider store={store}><App /></Provider>);

it('renders clients container', () => {
    const clients = wrapper.find('.clients');
    assert.equal(clients.length, 1);
  });

it('renders add-clients button', () => {
    const button = wrapper.find('.add-client');
    assert.equal(button.length, 1);
  });

it('renders at least a client', () => {
    const clients = wrapper.find('.clients .client');
    assert.notEqual(clients.length, 0);
});




it('renders Prompt', () => {
    const prompt = shallow(<Prompt />);
    assert.equal(prompt.length, 1);
  });

it('renders prompt previous button', () => {
    const prompt = shallow(<Prompt />);
    const previous = wrapper.find('.control-buttons .previous');
    assert.equal(previous.length, 1);
});

it('renders prompt next button', () => {
    const prompt = shallow(<Prompt />);
    const next = wrapper.find('.control-buttons .next');
    assert.equal(next.length, 1);
});

it('should open prompt', () => {
    const add = wrapper.find(".add-client")
    add.simulate('click');
    const prompt = wrapper.find(".prompt")
    expect(prompt.hasClass("show")).to.equal(true)
 });
