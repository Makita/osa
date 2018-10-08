import React from 'react';
import ReactDOM from 'react-dom';

import Content from './content';
import Index from './index';
import AppointmentForm from './appointment_form';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Content />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders index without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Index />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the form without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppointmentForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
