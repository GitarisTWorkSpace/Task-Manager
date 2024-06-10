import axios from "axios"
import { RootUrl } from "../config/config"

export const getUserMeInfo = async () => {
    const response = await axios.get(RootUrl+'/user/me', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
    })
    return await response.data
}