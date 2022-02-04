import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class PatientsPage extends Component {
    state = {  }

    componentDidMount() {
        axios.get('http://ambulance.local/api/admin/patients')
            .then(res => {
                console.log(res);
            });
    }


    render() {
        return (
            <h1>Patients Page</h1>
        );
    }
}

export default PatientsPage;