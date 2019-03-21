import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom"
import About from './components/About'
import Home from './components/Home'
import Navbar from './components/Navbar';
import styles from './App.css'

const App = () => (
  <div className={styles.App}>
    <Router>
      <Fragment>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
      </Fragment>
    </Router>
  </div>
);

export default App

ReactDOM.render(<App />, document.getElementById('app'))
