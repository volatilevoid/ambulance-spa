import React, { Component } from 'react';
import ApiService from '../../services/ApiService';


class DoctorFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            doctorTypes: null
         };
    }

    componentDidMount() {
        ApiService.getInstance().apiGet('admin/doctor-types')
            .then(doctorTypes => {
                console.log(doctorTypes);
            });
    }

    handleSubmit = () => {

    }

    handleChange = () => {

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input 
                    id="name-input" 
                    className="form-control" 
                    type="text" 
                    name='name'
                    value={this.props.name} 
                    onChange={this.handleChange}/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input 
                    id="last-name-input" 
                    className="form-control" 
                    type="text" 
                    name='last_name'
                    value={this.props.last_name} 
                    onChange={this.handleChange}/>
                </div>

                {/* SELECT with dr id's */}

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input 
                    id="username-input" 
                    className="form-control" 
                    type="text" 
                    name='username'
                    value={this.props.username} 
                    onChange={this.handleChange}/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                    id="password-input" 
                    className="form-control" 
                    type="password"
                    name='password'
                    value={this.props.password}
                    onChange={this.handleChange}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default DoctorFormComponent;