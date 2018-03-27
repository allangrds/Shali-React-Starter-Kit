import React from 'react'
import ReactDOM from 'react-dom'
import styles from './App.css'

const App = () => (
  <div className={styles.app}>
    <p>React here!</p>
  </div>
)
export default App
ReactDOM.render(<App />, document.getElementById('app'))
