import 'react-rangeslider/lib/index.css'
import Slider from 'react-rangeslider'
import _ from 'lodash';
import React from 'react';

import styles from './slider.scss';

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    let options = _.assign({}, this.props);

    return ( 
      <div className={`relative ${styles.wrapper}`}>
        <Slider {...options} tooltip={false}/>
        <span className="slider-tip">{options.value}</span>
      </div>
    );
  }
}
export default Comp;
