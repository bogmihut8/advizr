import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});
  
it('renders clients', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.clients')).to.have.lengthOf(1);
});