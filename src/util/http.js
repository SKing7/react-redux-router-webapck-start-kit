import axios from 'axios';
import _ from 'lodash';

axios.defaults.baseURL = '/api/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['Cache-Control'] = 'no-cache'
axios.defaults.transformRequest = [function (data) {
  let rt = [];
  if (_.isObject(data)) {
    _.forEach(data, function (v, k) {
      if (_.isObject(v)) {
        rt.push(encodeURIComponent(k) + '=' + encodeURIComponent(JSON.stringify(v)))
      }
      else {
        rt.push(encodeURIComponent(k) + '=' + encodeURIComponent(v))
      } 

    });
  }
  return rt.join('&');
}];

export default axios;
