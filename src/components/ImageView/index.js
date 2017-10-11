import React from 'react'
import styles from './imageView.scss'
import Icon from '../Icon'
import { Image } from '../UIReact';

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  open() {
    this.setState({
      activeImageView: true
    });
  }
  close() {
    this.setState({
      activeImageView: false
    });
  }
  render() {
    if (this.state.activeImageView !== true) {
      return <div className={`${styles.wrapper} none`}></div>
    }
    return (
    <div className={`${styles.wrapper}`}>
      <div className="image-content clearfix">
        <Icon name="close" width={22} height={22} onClick={this.close.bind(this)}/>
        <div className="image-cover fl">
          <Image src="" width="450" height="500" />
        </div>
        <div className="image-desc fr">
          <h3>GF2_PMS2_E116.3_N40.2_20170807_L1A0002529912</h3>
          <h3>介绍说明</h3>
          <ul>
            <li>景序列号：3966519</li>
            <li>景序列号：3966519</li>
            <li>景序列号：3966519</li>
            <li>景序列号：3966519</li>
            <li>景序列号：3966519</li>
          </ul>
        </div>
      </div>
    </div>
    );
  }
}


export default Comp;
