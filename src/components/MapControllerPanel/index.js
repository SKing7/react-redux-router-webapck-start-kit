import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { Grid, Checkbox, Button } from '../UIReact'
import styles from './mapControllerPanel.scss';

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controllerType: ''
    };
  }
  componentDidMount() {
  }
  selectCancel() {
    this.resetController();
  }
  handleClickOutside() {
    if (this.state.controllerType === 'satellite') {
      this.selectCancel();
    }
  }
  resetController() {
    this.setState({
      controllerType: ''
    });
  }
  toggleController(type, e) {
    if (this.state.controllerType === type) {
      this.resetController();
      this.props.onChange(type, 0);
    } else {
      this.setState({
        controllerType: type
      });
      this.props.onChange(type, 1);
    } 
  }
  stopBubble(e) {
    e.stopPropagation();
  }
  render() {
    const type = this.state.controllerType;
    const sourceSet = [
      [{ text: 'GF1', value: 'gf1' }, { text: 'GF2', value: 'gf2' } ],
      [{ text: 'GF1', value: 'gf1' }, { text: 'GF2', value: 'gf2' } ],
    ];
    return (
      <div className={styles.wrapper}>
        <span className={`controller-item ${type === 'polygon' ? 'active' : ''}`} onClick={this.toggleController.bind(this, 'polygon')}>绘制多边形</span>
        <div className={`controller-item ${type === 'satellite' ? 'active' : ''}`} onClick={this.toggleController.bind(this, 'satellite')}>
          <span>卫星</span>
          <div className={`satellite-wrapper ${type === 'satellite' ? '' : 'none'}`} onClick={this.stopBubble}>
            <h4>光学卫星</h4>
            <Grid columns={2} padded>
              {
                sourceSet.map((rowsItem) => {
                  let rt = rowsItem.map((item) => {
                    return (
                      <Grid.Column>
                        <Checkbox label={item.text}/>
                      </Grid.Column>
                    );
                  });
                  return (
                    <Grid.Row>{rt}</Grid.Row>
                  )
                })
              }
            </Grid>
            <h4>光学卫星</h4>
            <Grid columns={2} padded>
              {
                sourceSet.map((rowsItem) => {
                  let rt = rowsItem.map((item) => {
                    return (
                      <Grid.Column>
                        <Checkbox label={item.text}/>
                      </Grid.Column>
                    );
                  });
                  return (
                    <Grid.Row>{rt}</Grid.Row>
                  )
                })
              }
            </Grid>
            <div className="btn-group clearfix mt20">
              <Button className="btn-cancel fr" onClick={this.selectCancel.bind(this)}>取消</Button>
              <Button className="btn-primary fr mr10">确定</Button>
            </div>
            <span className="arrow-left"></span>
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(Comp);
