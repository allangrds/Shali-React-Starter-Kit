import React from 'react'
import ReactDOM from 'react-dom'
import styles from './App.css'

const App = () => (
  <div className={styles.app}>
    <p>React here 2!</p>
    <p className={styles.teste}>React here 2!</p>
  </div>
)
export default App
ReactDOM.render(<App />, document.getElementById('app'))
