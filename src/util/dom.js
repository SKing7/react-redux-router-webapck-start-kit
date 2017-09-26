import { findDOMNode } from 'react-dom'
import _ from 'lodash'

export const findSelected = (ndWrapper, name) => {
  ndWrapper = findDOMNode(ndWrapper);
  let nlRadio = ndWrapper.querySelectorAll('[name="' + name + '"]');
  let nd = _.filter(nlRadio, (ndRadio) => {
    return ndRadio.checked === true
  });
  return nd;
}

export const find = (ndWrapper, selector, filter) => {
  ndWrapper = findDOMNode(ndWrapper);
  let nl = ndWrapper.querySelectorAll(selector);
  nl = _.filter(nl, filter);
  return nl;
}
