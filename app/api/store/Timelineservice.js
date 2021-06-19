import axios from 'axios';
import * as Config from '../config';

export default function Timelineservice(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}