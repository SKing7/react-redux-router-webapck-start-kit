import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import BaseMap from '../../components/BaseMap'
import Header from '../../components/Header'
import { fetchLayer } from '../../modules/map'
import styles from './layout.scss'

class MainLayout extends React.Component {

  render() {
    return (
    <div className={`h100 ${styles.wrapper}`}>
      <Header />
      <BaseMap />
      {this.props.mapData.layers}
      {this.props.children}
    </div>);
  }
}

MainLayout.propTypes = {
  children: PropTypes.node,
}

const mapStateToProps = (state) => {
  return {
    mapData: state.map
  }
}

const mapDispatchToProps = {
    fetchLayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
