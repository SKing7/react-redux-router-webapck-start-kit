import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import BaseMap from '../../components/BaseMap'
import styles from './layout.scss'

class Index extends React.Component {

  render() {
    return (
    <div className={`h100 ${styles.wrapper}`}>
      <BaseMap />
      {this.props.children}
    </div>);
  }
}
Index.propTypes = {
  children: PropTypes.node,
}

export default Index
