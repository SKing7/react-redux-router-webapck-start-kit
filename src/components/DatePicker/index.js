import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import DatePicker from 'react-datepicker';
import _ from 'lodash';

class DatePickerCus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {

    let options = _.assign({}, {
      locale: "zh-CN",
      dateFormat: "YYYY-MM-DD"
    }, this.props);

    return ( 
      <DatePicker {...options} />
    );
  }
}
export default DatePickerCus;
