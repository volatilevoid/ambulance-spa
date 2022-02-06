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

    apiGet(endpoint, queryParams = {}) {
        let config = this.config        
        
        if (Object.keys(queryParams).length !== 0) {
            config = Object.assign({params: queryParams}, this.config);
        }

        console.log(this.BASE_URL + endpoint);
        return axios.get(this.BASE_URL + endpoint, config);
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