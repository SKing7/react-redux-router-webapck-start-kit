import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
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
      <div className="clearfix">
        <ul className="fl">
          <li className="process-nav">
            <Link to='/index/' activeClassName='active'>数据处理</Link>
          </li>
        </ul>
        <div className="content-wrapper fl">
          {this.props.children}
        </div>
      </div>
    </div>);
  }
}
Index.propTypes = {
  children: PropTypes.node,
}

export default Index
