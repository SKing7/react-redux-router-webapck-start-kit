import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import 'normalize.css/normalize.css'
import styles from './layout.scss'

class Index extends React.Component {

  render() {
    return (
    <div className={`h100 ${styles.wrapper}`}>
      <header>
        <h1 className="header-nav">
          标题
        </h1>
      </header>
      <div className="content-wrapper">
        {this.props.children}
      </div>
    </div>);
  }
}
Index.propTypes = {
  children: PropTypes.node,
}

export default Index
