import React from 'react';
import styles from './header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <header className={styles.wrapper}>
        Header
      </header>
    );
  }
}
export default Header; 
