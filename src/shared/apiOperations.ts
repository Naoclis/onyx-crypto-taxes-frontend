/********** [  LIBRARIES  ] ***************/
import axios from 'axios';

/********* [ MY LIBRARIES ] ***************/

/*********** [ CLASS ] ****************/
export default class ApiOperations {

    async get (mode: string, prefix : string) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}${prefix}/${mode}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async post(mode: string, dataToSend: any, prefix: string) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_PATH}${prefix}/${mode}`, dataToSend);
            return response.data;
        } catch (error) {
            console.error(error);
        }        
    }
};
