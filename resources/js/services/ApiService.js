import axios from "axios";

class ApiService
{
    BASE_URL = 'http://ambulance.local/api/';
    token = '';

    config = {
        'headers': {
            'Authorization': `Bearer ${this.token}`
        }
    }

    // singleton service
    static classInstance = null;

    static getInstance() {
        if(ApiService.classInstance === null) {
            ApiService.classInstance = new ApiService();
        }
        return this.classInstance;
    }

    apiGet(endpoint) {
        return axios.get(this.BASE_URL + endpoint, this.config);
    }

    apiPost(endpoint, data ={}) {
        return axios.post(this.BASE_URL + endpoint, data, this.config);
    }

    apiDelete(endpoint) {
        return axios.delete(this.BASE_URL + endpoint, this.config);
    }

    setToken(token) {
        this.token = token;
    }
  
}

export default ApiService;