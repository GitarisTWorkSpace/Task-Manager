import axios from 'axios'

export const autoAuth = async () => {
    if (localStorage.getItem('refresh_token')){
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/auth/refresh', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('refresh_token')
                }});

            const tokens = await response.data;
            localStorage.setItem('access_token', tokens.access_token)
            localStorage.setItem('refresh_token', tokens.refresh_token)
        } catch (e) {
            console.log(e)
            return false
        }
        return true
    }
}