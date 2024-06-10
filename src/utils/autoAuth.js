import axios from 'axios'
import { RootUrl } from '../config/config';

export const autoAuth = async () => {
    if (localStorage.getItem('refresh_token') != null){
        try{
            const response = await axios.get(RootUrl+'/auth/refresh', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('refresh_token')
                }});

            const tokens = await response.data;
            localStorage.setItem('access_token', tokens.access_token)
            localStorage.setItem('refresh_token', tokens.refresh_token)
            return tokens.access_token
        } catch (e) {
            console.log(e)
            return null
        }
    }
    //console.log(localStorage.getItem('refresh_token'))
    return null
}