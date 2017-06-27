import jsdom from 'jsdom';
import _$ from 'jquery';
import TestUtils from 'react-dom/test-utils'
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';

// Set up testing environemnt to run like a browser in the command line

const {JSDOM} = jsdom;

const dom = new JSDOM('<!doctype html><html><body></body></html>');
const win = dom.window;
const doc = win.document;

global.document = doc;
global.window = win;
global.navigator = global.window.navigator;

// Old stuff
// global.document = new JSDOM('<!doctype html><html><body></body></html>');
// global.window = global.document.defaultView;
// const $ = _$(global.window);

const $ = _$(global.window);

// Build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance)); //produces HTML
}

// Build helper for simulating events
$.fn.simulate = function (eventName, value) {
  if (value)
    this.val(value);

  TestUtils.Simulate[eventName](this[0]);
}

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect }
