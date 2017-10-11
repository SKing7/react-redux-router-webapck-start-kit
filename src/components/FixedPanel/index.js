import { connect } from 'react-redux'
import React from 'react'
import { Table, Button, Checkbox } from '../UIReact'
import styles from './fixedPanel.scss'
import ImageView from '../ImageView'

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
    this.state = {
      activeImageView: false,
      show: false
    };
  }
  open(props) {
    this.setState({
      ...props,
      show: true
    });
  }
  close() {
    this.setState({
      show: false
    });
  }
  selectDone() {
    this.close();
  }
  selectCancel() {
    this.close();
  }
  viewImage(e) {
    this.imageView.open();
  }
  render() {
    let imageProps = {
      activeImageView: this.state.activeImageView,
    };

    return (
    <div className={`${styles.wrapper} ${!this.state.show ? 'none' : ''}`}>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>选择</Table.HeaderCell>
            <Table.HeaderCell>操作</Table.HeaderCell>
            <Table.HeaderCell>ID号</Table.HeaderCell>
            <Table.HeaderCell>卫星</Table.HeaderCell>
            <Table.HeaderCell>传感器</Table.HeaderCell>
            <Table.HeaderCell>采集时间</Table.HeaderCell>
            <Table.HeaderCell>分辨率</Table.HeaderCell>
            <Table.HeaderCell>云量</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell><Checkbox /></Table.Cell>
            <Table.Cell><a onClick={this.viewImage.bind(this)}>查看图片</a></Table.Cell>
            <Table.Cell>Initial commit</Table.Cell>
            <Table.Cell>Initial commit</Table.Cell>
            <Table.Cell>Initial commit</Table.Cell>
            <Table.Cell>Initial commit</Table.Cell>
            <Table.Cell>Initial commit</Table.Cell>
            <Table.Cell>10 hours ago</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell><Checkbox /></Table.Cell>
            <Table.Cell>Initial commit</Table.Cell>
            <Table.Cell>Initial commit</Table.Cell>
            <Table.Cell>Initial commit</Table.Cell>
            <Table.Cell>Initial commit</Table.Cell>
            <Table.Cell>Initial commit</Table.Cell>
            <Table.Cell>Initial commit</Table.Cell>
            <Table.Cell>10 hours ago</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <div className="btn-group clearfix mt30">
        <Button className="btn-cancel fr" onClick={this.selectCancel.bind(this)}>取消</Button>
        <Button className="btn-primary fr" onClick={this.selectDone.bind(this)}>确定</Button>
      </div>
      <ImageView {...imageProps} ref={(comp) => { this.imageView = comp; }} />
    </div>
    );
  }
}


export default Comp;
