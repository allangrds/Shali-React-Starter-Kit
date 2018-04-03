import React from 'react'
import styles from './Button.css'

const Button = ({ children }) => (
  <button className={styles.button}>
    <img src={require('../assets/images/logo.png')} alt="Logo" />
    { children }
  </button>
)

export default Button
