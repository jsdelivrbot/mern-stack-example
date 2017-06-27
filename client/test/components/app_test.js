import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

// Use 'describe' do group together similar tests
describe('App', () => {
  let component;

  beforeEach(() => {
    // Wrap App into MemoryRouter because it has Link elements
    // otherwise it will throw an error about missing 'history' property.
    component = renderComponent(() => { return(<MemoryRouter><App/></MemoryRouter>)})
    // component = renderComponent(App);
  });

  // Use 'it' to test a single attribute of a target
  it('shows a header', () => {
    // expect(component.find('.header')).to.exist;
  });

  it('shows authorization button', () => {
    // expect(component.find('.auth-button')).to.exist;
  });
});
