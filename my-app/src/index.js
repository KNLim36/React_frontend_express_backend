import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const express = require('express')
// const expressApp = express()
// const port = 3001

// expressApp.get('/', (req, res) => {
//   res.status(200).send('Hello World!');
// })

// expressApp.listen(port, () => {
//   console.log(`App running on port ${port}.`)
// })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
