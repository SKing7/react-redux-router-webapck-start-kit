import React from 'react';
import styles from './header.scss';
import { Form, Input, Dropdown, Button } from '../UIReact'
import CitySelect from '../CitySelect'
import DatePicker from '../DatePicker'
import Slider from '../RangeSlider'
import FixedPanel from '../FixedPanel'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cloudValue: 12,
      cityOrCoord: 'city'
    };
    this.options = {
      sourceOptions: [
        { key: '1', value: '1', text: '高分一号' },
        { key: '2', value: '2', text: '高分二号' },
      ],
      cityOrCoord: [
        { key: '1', value: 'city', text: '行政区域' },
        { key: '2', value: 'coord', text: '经纬度' },
      ], 
    };
  }
  changeCityCoord(e, data) {
    this.setState({
      cityOrCoord: data.value 
    });
  }
  handleStartDate(v) {
    this.setState({
      startDate: v
    });
  }
  handleEndDate(v) {
    this.setState({
      endDate: v
    });
  }
  handleCloudChange(value) {
    this.setState({
      cloudValue: value
    })
  }
  search() {
    this.searchPanel.open();
  }
  render() {
    let cityOrCoordContent;
    if (this.state.cityOrCoord === 'city') {
      cityOrCoordContent = <CitySelect />;
    } else {
      cityOrCoordContent = (
          <Form.Group inline className="coord-wrapper">
            <Form.Field width={2}>左上角:</Form.Field>
            <Form.Input placeholder="经度"  value={this.state.ltLng} width={3} />
            <Form.Input placeholder="纬度"  value={this.state.ltLat} width={3} />
            <Form.Field width={2}>右上角:</Form.Field>
            <Form.Input placeholder="经度"  value={this.state.rbLng} width={3} />
            <Form.Input placeholder="纬度"  value={this.state.rbLat} width={3} />
          </Form.Group>
      );
    }
    return (
      <header className={styles.wrapper}>
        <Form>
          <Form.Group inline>
            <Form.Field className="cell-area">
              <Form.Group inline>
                <Dropdown value={this.state.cityOrCoord} options={this.options.cityOrCoord} onChange={this.changeCityCoord.bind(this)} className="mr10" />
                {cityOrCoordContent}
              </Form.Group>
            </Form.Field>
            <Form.Field className="cell-source">
              <label>数据源：</label>
              <Dropdown placeholder='数据源' selection options={this.options.sourceOptions} />
            </Form.Field>
            <Form.Field className="cell-date-select">
              <Form.Group inline>
                <label>日期：</label>
                <Form.Field>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleStartDate.bind(this)}
                    placeholderText="起始日期" />
                </Form.Field>
                <span className="mr15">-</span>
                <Form.Field>
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleEndDate.bind(this)}
                    placeholderText="结束日期" />
                </Form.Field>
              </Form.Group>
            </Form.Field>
            <Form.Field className="cell-cloud">
              <Form.Group inline>
                <label>云层：</label>
                <Form.Field>
                  <Slider
                    min={10}
                    max={20}
                    step={1}
                    value={this.state.cloudValue}
                    onChange={this.handleCloudChange.bind(this)} />
                </Form.Field>
              </Form.Group>
            </Form.Field>
            <Form.Field className="cell-search">
              <Button className="btn-search" onClick={this.search.bind(this)}>检索</Button>
            </Form.Field>
          </Form.Group>
        </Form>
        <FixedPanel ref={(comp) => { this.searchPanel = comp; }} />
      </header>
    );
  }
}
export default Header; 
