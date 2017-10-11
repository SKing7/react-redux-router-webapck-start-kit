import React from 'react';
import _ from 'lodash';
import { Form, Input, Tab, Button } from '../UIReact';
import onClickOutside from 'react-onclickoutside';
import { getCityList } from '../../util/base'
import styles from './citySelect.scss'

class CitySelect extends React.Component {
  constructor(props) {
    super(props);
    let defaultProvinceData = {
      code: '',
      name: '请选择'
    };
    let defaultCityData = {
      code: '',
      name: '请选择 '
    };
    let defaultCountryData = {
      code: '',
      name: '请选择  '
    };

    this.options = {
      defaultProvinceData: defaultProvinceData,
      defaultCityData: defaultCityData,
      defaultCountryData: defaultCountryData
    }
    let stateData = {
      currentProvince: defaultProvinceData,
      currentCity: defaultCityData,
      currentCountry: defaultCountryData,
    };

    this.state = {
      ...stateData,
      currentActiveIndex: 0,
      cityList: getCityList(),
      tabs: this.getTabs(stateData)
    };
  }
  handleClickOutside() {
    this.selectCancel();
  }
  getTabs(state) {
    state = _.assign({}, this.state, state);
    let menuItems = [
      { 
        menuItem: state.currentProvince.name,
        render: () => {
          return (
            <ul className="city-blocker clearfix">
              {_.map(this.state.cityList, (obj, code) => {
                  return <li key={code}><a href="javascript:;" className={state.currentProvince.code === code ? 'active' : ''} onClick={ () => this.setProvince(obj, code) }>{obj.name}</a></li>;
              })}
            </ul>
          )
        }
      }, {
        menuItem: state.currentCity.name,
        render: () => {
          if (!state.currentProvince.code) {
            return;
          }
          return (
            <ul className="city-blocker clearfix">
              {_.map(this.state.cityList[state.currentProvince.code].children, (obj, code) => {
                  return <li key={code}><a href="javascript:;"
                  className={state.currentCity.code === code ? 'active' : ''} onClick={ () => this.setCity(obj, code) }>{obj.name}</a></li>;
              })}
            </ul>
          );
        }
      }
    ];
    if (!state.currentProvince.isDirectCity) {
      menuItems.push({
        menuItem: state.currentCountry.name,
        render: () => {
          if (!state.currentCity.code) {
            return;
          }
          return (
            <ul className="city-blocker clearfix">
              {_.map(this.state.cityList[state.currentProvince.code].children[state.currentCity.code].children, (obj, code) => {
                  return <li key={code}><a href="javascript:;"
                    className={state.currentCountry.code === code ? 'active' : ''}
                    onClick={ () => this.setCountry(obj, code) }>{obj.name}</a></li>;
              })}
            </ul>
          );
        }
      });
    }
    return menuItems;
  }
  changeTab(e, data) {
    this.setState({
      currentActiveIndex: data.activeIndex,
    });
  }
  getRegionInputValue() {
    let arr = [
      this.state.currentProvince,
      this.state.currentCity,
      this.state.currentCountry,
    ];

    return _.reduce(arr, function (sum, item) {
      if (item.code) {
        return sum ?  (sum + '/' + item.name) : item.name 
      } else {
        return sum;
      }
    }, '');
  }
  selectDone() {
    this.whenDone(true);
  }
  selectCancel() {
    this.cityTabWrapper.style.display = 'none';
  }
  whenDone(hasDone) {
    // 最后一步
    let state = this.state;
    if (hasDone) {
      this.cityTabWrapper.style.display = 'none';
      this.setState({
        currentActiveIndex: 0
      });
    }
  }
  setProvince(obj, code) {
    let data = {
      code,
      ...obj,
    };
    let stateData = {
      currentProvince: data,
      currentCity: this.options.defaultCityData,
      currentCountry: this.options.defaultCountryData,
    }; 
    this.setState({
      ...stateData,
      currentActiveIndex: 1,
      tabs: this.getTabs(stateData)
    });
    this.whenDone();
  }
  setCity(obj, code) {
    let data = {
      code,
      ...obj,
    };
    let stateData = {
      currentCity: data,
      currentCountry: this.options.defaultCountryData,
    }; 
    this.setState({
      ...stateData,
      currentActiveIndex: 2,
      tabs: this.getTabs(stateData)
    });
    this.whenDone(this.state.currentProvince.isDirectCity);
  }
  setCountry(obj, code) {
    let data = {
      code,
      ...obj,
    };
    let stateData = {
      currentCountry: data,
    }; 
    this.setState({
      ...stateData,
      tabs: this.getTabs(stateData)
    });
    this.whenDone(true);
  }
  createCityList() {
    this.cityTabWrapper.style.display = 'block';
  }
  render () {
    return (
      <span className={`relative ${styles.wrapper}`}>
        <Input placeholder="选择区域" onClick={this.createCityList.bind(this)}  value={this.getRegionInputValue()}ref={ (nd) => this.regionInput = nd }/>
        <div className="city-list-wrapper" ref={ (nd) => this.cityTabWrapper = nd }>
          <div className="arrow-top"></div>
          <Tab panes={this.state.tabs} activeIndex={this.state.currentActiveIndex} onTabChange={this.changeTab.bind(this)}/>
          <div className="btn-group clearfix">
            <Button className="btn-cancel fr" onClick={this.selectCancel.bind(this)}>取消</Button>
            <Button className="btn-primary fr" onClick={this.selectDone.bind(this)}>确定</Button>
          </div>
        </div>
      </span>
    );
  }
}

export default onClickOutside(CitySelect)
