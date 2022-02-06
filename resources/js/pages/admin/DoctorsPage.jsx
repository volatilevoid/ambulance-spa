import React, { Component } from 'react';
import ApiService from '../../services/ApiService';
import { Link } from 'react-router-dom';


class DoctorsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            doctors: []
         };
    }

    componentDidMount() {
        this.fetchDoctors();
    }

    fetchDoctors() {
        ApiService.getInstance().apiGet('admin/doctors')
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        doctors: response.data.doctors
                    });    
                }
                
            });
    }

    deleteDoctor = (doctor_id) => {
        let confirmed = confirm('Are you sure?');
        
        if(confirmed) {
            ApiService.getInstance().apiDelete(`admin/doctors/${doctor_id}`)
                .then(result => {
                    this.fetchDoctors();
                });
        }
    }

    render() {
        const rows = this.state.doctors.map( doctor => 
            <tr key={doctor.id}>
                <th scope='row'>{doctor.id}</th>
                <td>{doctor.name}</td>
                <td>{doctor.last_name}</td>
                <td>{doctor.type}</td>
                <td>{doctor.username}</td>
                <td>
                    <div className="dropdown">
                        <button id="dropdownMenuButton1" className='btn btn-outline-primary dropdown-toggle mx-1' data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-gear-fill"></i></button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <Link to={`/admin/doctors/${doctor.id}`} className='dropdown-item'>
                                    Edit
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/doctors" className="dropdown-item" onClick={() => this.deleteDoctor(doctor.id)}>
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
                    <div><h1>Doctors</h1></div>
                    <Link to="/admin/doctors/0">
                        <button className='btn btn-outline-success'>New Doctor</button>
                    </Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>Type</th>
                        <th scope='col'>Username</th>
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

export default DoctorsPage;