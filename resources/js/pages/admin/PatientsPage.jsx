import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../services/ApiService';
class PatientsPage extends Component {
    state = { 
        patients: []
     }

    componentDidMount() {
        this.fetchPatients();
    }

    fetchPatients() {
        ApiService.getInstance().apiGet('admin/patients')
            .then(response => {
                console.log('res', response);
                if (response.data.success) {
                    this.setState({
                        patients: response.data.patients
                    });    
                }
                
            });
    }

    deletePatient = (patient_id) => {
        let confirmed = confirm('Are you sure?');
        
        if(confirmed) {
            ApiService.getInstance().apiDelete(`admin/patients/${patient_id}`)
                .then(result => {
                    console.log(result);
                    this.fetchPatients();
                });
        }
    }

    render() {
        const rows = this.state.patients.map( patient => 
            <tr key={patient.id}>
                <th scope='row'>{patient.id}</th>
                <td>{patient.name}</td>
                <td>{patient.last_name}</td>
                <td>{patient.personal_identification_number}</td>
                <td>{patient.location}</td>
                <td>
                    <div className="dropdown">
                        <button id="dropdownMenuButton1" className='btn btn-outline-primary dropdown-toggle mx-1' data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-gear-fill"></i></button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <Link to={`/admin/patients/${patient.id}`} className='dropdown-item'>
                                    Edit
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/patients" className="dropdown-item" onClick={() => this.deletePatient(patient.id)}>
                                    Remove
                                </Link>
                            </li>
                        </ul>
                    </div>

                </td>
            </tr>
        );

        return (
            <div className='d-flex flex-column col'>
                <div className='d-flex justify-content-between'>
                    <div><h1>Patients</h1></div>
                    <Link to="/admin/patients/0">
                        <button className='btn btn-outline-success'>New Patient</button>
                    </Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>Personal ID Number</th>
                        <th scope='col'>Location</th>
                        <th scope='col'></th>
                    </tr>
                    </thead>
                    <tbody>
                        { rows }
                    </tbody>
                </table>

            </div>
        );
    }
}

export default PatientsPage;