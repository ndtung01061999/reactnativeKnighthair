import axios from 'axios';
import * as Config from '../config';

function Customer(endpoint, method = 'GET', body) {
  return axios({
    method: method,
    url: `${Config.API_URL}/customer/${endpoint}`,
    data: body,
  }).catch(err => {
    console.log(err);
  });
}
function getCustomer(body) {
  return axios({
    method: 'GET',
    url: `${Config.API_URL}/customer/${body}`,
    data: null,
  }).catch(err => {
    console.log(err);
  });
}
function updateCustomer(body) {
  return axios({
    method: 'PUT',
    url: `${Config.API_URL}/customer/${body.idaccount}`,
    data: body,
  }).catch(err => {
    console.log(err);
  });
}
function updateImage(body) {
  console.log(body);
  return axios({
    method: 'PUT',
    url: `${Config.API_URL}/customer/image/${body.idaccount}`,
    data: {
      image: body.image,
    },
  }).catch(err => {
    console.log(err);
  });
}
export default {
  getCustomer,
  updateCustomer,
  updateImage,
};
