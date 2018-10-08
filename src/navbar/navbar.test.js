import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';

function handleClick() { return true; }
class App { }

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Navbar page="Info" handleClick={handleClick} app={App} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
