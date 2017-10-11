import React from 'react';
import _ from 'lodash';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./assets', false, /\.png$/));

class Comp extends React.Component {
  render() {
    const props = this.props;
    let name = props.name;
    return (
      <i onClick={props.onClick} className="icon" style={{width: `${props.width}px`, height: `${props.height}px`, backgroundImage: `url(${images[name + '.png']})`, backgroundSize: '50% 50%'}}></i>
    );
  }
}

export default Comp;
