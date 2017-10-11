import http from '../util/http';
import _ from 'lodash'

const FETCH_LAYER_LIST = 'fetchLayerList';

// ------------------------------------
const initialState = {
  layers: [1, 2],
};

const ACTION_HANDLERS = {
  [FETCH_LAYER_LIST]: (state, action) => {
    return _.assign({}, state, {fileList: action.payload.file_list});
  },
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ?  handler(state, action) : state
}

export const fetchLayer = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      http.get('/api/agro/hbxm/publish_layers?type=hbxm_area', params)
      .then(function (res) {
        dispatch({
          type: FETCH_LAYER_LIST,
          payload: res.data
        })
        resolve()
      });
    });
  }
};
