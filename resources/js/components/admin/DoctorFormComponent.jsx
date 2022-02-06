import React, { Component } from 'react';
import ApiService from '../../services/ApiService';
import { withRouter } from '../../routes/withRouter';

class DoctorFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            last_name: '',
            doctor_type_id: 0,
            username: '',
            password: '',
            doctorTypes: [],
            submit_disabled: true,
            errorMessage: ''
         };
    }

    handleChange = (event) => {
        // shallow
        this.setState({
            [event.target.name]: event.target.value
        });

        if (this.state.submit_disabled) {
            this.setState({
                submit_disabled: false
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        ApiService.getInstance().apiPost('admin/doctors', {
            id: this.state.id,
            name: this.state.name,
            last_name: this.state.last_name,
            doctor_type_id: this.state.doctor_type_id,
            username: this.state.username,
            password: this.state.password 
        }).then(response => {
            if (response.data.success) {
                this.props.navigate(-1);
            } else {
                this.setState({
                    errorMessage: response.data.message
                });
            }
        });
    }

    componentDidMount() {
        ApiService.getInstance().apiGet('admin/doctor-types')
            .then(response => {
                this.setState({
                    doctorTypes: response.data.doctor_types
                });
            });
        
        if (this.props.params.id != 0) {
            ApiService.getInstance().apiGet(`admin/doctors/${this.props.params.id}`)
                .then(response => {
                    this.setState({
                        id: response.data.doctor.id,
                        name: response.data.doctor.name,
                        last_name: response.data.doctor.last_name,
                        doctor_type_id: response.data.doctor.doctor_type_id,
                        username: response.data.doctor.username
                    });
                });
        }
        
    }

    render() {
        const doctor_types = this.state.doctorTypes.map(doctorType => <option key={doctorType.id} value={doctorType.id}>{doctorType.name}</option>);
        const button = this.state.id === 0 ? 
            <button type="submit" disabled={this.state.submit_disabled || this.state.doctor_type_id == 0} className="btn btn-primary">Createxxx</button> :
            <button type="submit" disabled={this.state.doctor_type_id == 0} className="btn btn-primary">Submit</button>
        let headerContent = this.state.id === 0 ? 'Create doctor' : 'Update doctor';
        let errors = '';
        
        if (this.state.errorMessage) {
            errors = Object.keys(this.state.errorMessage).map(key => <p className='text-danger' key={key}>{this.state.errorMessage[key]}</p>);
        }

        return (
            <div >
                <h1>{ headerContent }</h1>
                { this.state.errorMessage && errors }
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input 
                        id="name-input" 
                        className="form-control" 
                        type="text" 
                        name='name'
                        value={this.state.name} 
                        onChange={this.handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input 
                        id="last-name-input" 
                        className="form-control" 
                        type="text" 
                        name='last_name'
                        value={this.state.last_name} 
                        onChange={this.handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label>Select Location</label>
                        <select className='form-select' name='doctor_type_id' value={this.state.doctor_type_id} onChange={this.handleChange}>
                            <option key="0" value="0">Choose Dr. Type</option>
                            { doctor_types }
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input 
                        id="username-input" 
                        className="form-control" 
                        type="text" 
                        name='username'
                        value={this.state.username} 
                        onChange={this.handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                        id="password-input" 
                        className="form-control" 
                        type="password" 
                        name='password'
                        value={this.state.password} 
                        onChange={this.handleChange}/>
                    </div>

                    { button }
                </form>
            </div>
            
        );
    }
}

export default withRouter(DoctorFormComponent);