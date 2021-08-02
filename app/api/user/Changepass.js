import axios from 'axios';
import * as Config from '../config';

export default function Changepass(endpoint, body) {
  return axios({
    method: 'PUT',
    url: `${Config.API_URL}/account/${endpoint}`,
    data: body,
  }).catch(err => {
    console.log(err);
  });
}
