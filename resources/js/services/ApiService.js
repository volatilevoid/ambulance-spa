import axios from "axios";

class ApiService
{
    baseUrl = 'http://abmulance.local/api/';
    token = '';

    config = {
        'headers': {
            'Authorization': `Bearer ${token}`
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
        const config = {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        }
        
        return axios.get(endpoint, config);
    }

    apiPost(endpoint, data) {
        const config = {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        };

        return axios.post(this.baseUrl + endpoint, data, config);
    }

    setToken(token) {
        this.token = token;
    }
    
    setConfig(config) {

    }
}

export default ApiService;