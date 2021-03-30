import Axios from 'axios';
import { SERVER_ADDRESS } from '../components/Config';
import Cookie from 'js-cookie';

export const CustomAxios = Axios.create({
    baseURL: SERVER_ADDRESS,
    headers: Cookie.get("token")
});