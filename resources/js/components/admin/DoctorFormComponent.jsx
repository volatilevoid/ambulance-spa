import React, { Component } from 'react';
import ApiService from '../../services/ApiService';
import { withRouter } from '../../routes/withRouter';

class DoctorFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: {
                id: 0,
                name: '',
                last_name: '',
                type_id: '',
                username: '',
                password: '',
            },
            doctorTypes: [],
            submit_disabled: true
         };
    }

    componentDidMount() {
        ApiService.getInstance().apiGet('admin/doctor-types')
            .then(doctorTypes => {
                console.log(doctorTypes);
            });


    }

    handleChange = (event) => {
        // shallow
        let doctor = {...this.state.doctor};
        doctor[event.target.name] = event.target.value;

        this.setState({
            doctor: doctor
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
            id: this.state.doctor.id,
            name: this.state.doctor.name,
            last_name: this.state.doctor.last_name,
            type_id: this.state.doctor.type_id,
            username: this.state.doctor.username,
            password: this.state.doctor.password 
        }).then(response => {
            if (response.data.success) {
                // this.setState({
                //     doctor: {
                //         id: response.data.doctor.id,
                //         name: response.data.doctor.name,
                //         last_name: response.data.doctor.last_name,
                //         type_id: response.data.doctor.type_id,
                //         username: response.data.doctor.username,
                //         password: response.data.doctor.password, 
                //     }
                // });
                this.props.navigate(-1);
            }
        });
    }

    componentDidMount() {
        console.log(this);
        ApiService.getInstance().apiGet('admin/doctor-types')
            .then(response => {
                this.setState({
                    doctorTypes: response.data.doctor_types
                });
            });
        
        if (this.props.params.id != 0) {
            console.log(`admin/doctors/${this.props.params.id}`);
            ApiService.getInstance().apiGet(`admin/doctors/${this.props.params.id}`)
                .then(response => {
                    console.log(response);
                    this.setState({
                        doctor: {
                            id: response.data.doctor.id,
                            name: response.data.doctor.name,
                            last_name: response.data.doctor.last_name,
                            type_id: response.data.doctor.type_id,
                            username: response.data.doctor.username
                        }
                    });
                    console.log(this);
                });
        }
        
    }

    render() {
        const doctor_types = this.state.doctorTypes.map(doctorType => <option key={doctorType.id} value={doctorType.id}>{doctorType.name}</option>);
        const button = this.state.id === 0 ? 
            <button type="submit" disabled={this.state.submit_disabled} className="btn btn-primary">Create</button> :
            <button type="submit" className="btn btn-primary">Submit</button>
        let headerContent = this.state.id === 0 ? 'Create doctor' : 'Update doctor'
        return (
            <div >
                <h1>{ headerContent }</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input 
                        id="name-input" 
                        className="form-control" 
                        type="text" 
                        name='name'
                        value={this.state.doctor.name} 
                        onChange={this.handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input 
                        id="last-name-input" 
                        className="form-control" 
                        type="text" 
                        name='last_name'
                        value={this.state.doctor.last_name} 
                        onChange={this.handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label>Select Location</label>
                        <select className='form-select' name='type_id' value={this.state.doctor.type_id} onChange={this.handleChange}>
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
                        value={this.state.doctor.username} 
                        onChange={this.handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                        id="password-input" 
                        className="form-control" 
                        type="password" 
                        name='password'
                        value={this.state.doctor.password} 
                        onChange={this.handleChange}/>
                    </div>

                    { button }
                </form>
            </div>
            
        );
    }
}

export default withRouter(DoctorFormComponent);