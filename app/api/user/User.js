import axios from 'axios';
import * as Config from '../config';

function Getuser(endpoint, method = 'GET', body) {
  return axios({
    method: method,
    url: `${Config.API_URL}/account/${endpoint}`,
    data: body,
  }).catch(err => {
    console.log(err);
  });
}
function login(body) {
  return axios({
    method: 'POST',
    url: `${Config.API_URL}/account/login`,
    data: body.payload,
  }).catch(err => {
    console.log(err);
  });
}
export default {
  Getuser,
  login,
};
