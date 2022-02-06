import React, { Component } from 'react';
import ApiService from '../../services/ApiService';
import { withRouter } from '../../routes/withRouter';

class PatientFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: 0,
            name: '',
            last_name: '',
            location_id: '',
            personal_identification_number: '',
            note: '',
            locations: [],
            submit_disabled: true,
            errorMessage: ''
         };
    }

    handleChange = (event) => {

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
        
        ApiService.getInstance().apiPost('admin/patients', {
            id: this.state.id,
            name: this.state.name,
            last_name: this.state.last_name,
            location_id: this.state.location_id,
            personal_identification_number: this.state.personal_identification_number,
            note: this.state.note 
        }).then(response => {
            console.log('response', response);
            if (response.data.success) {
                this.props.navigate(-1);
            } else {
                this.setState({errorMessage: response.data.message});
            }
            console.log(this);
        });
    }

    componentDidMount() {
        ApiService.getInstance().apiGet('locations')
            .then(response => {
                this.setState({

                    locations: response.data.locations
                });
            });
        if (this.props.params.id != 0) {
            ApiService.getInstance().apiGet(`admin/patients/${this.props.params.id}`)
                .then(response => {
                    this.setState({
                        id: response.data.patient.id,
                        name: response.data.patient.name,
                        last_name: response.data.patient.last_name,
                        location_id: response.data.patient.location_id,
                        personal_identification_number: response.data.patient.personal_identification_number,
                        note: response.data.patient.note, 
                    });
                });
        }
        
    }


    render() {
        const locations = this.state.locations.map(location => <option key={location.id} value={location.id}>{location.name}</option>);
        const button = this.state.id === 0 ? 
            <button type="submit" disabled={this.state.submit_disabled || this.state.location_id == 0} className="btn btn-primary">Create</button> :
            <button type="submit" disabled={this.state.location_id == 0} className="btn btn-primary">Submit</button>
        let headerContent = this.state.id === 0 ? 'Create patient' : 'Update patient'
        let errors = '';
        
        if (this.state.errorMessage) {
            errors = Object.keys(this.state.errorMessage).map(key => <p className='text-danger' key={key}>{this.state.errorMessage[key]}</p>);
        }

        console.log(errors);
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
                        <select className='form-select' name='location_id' value={this.state.location_id} onChange={this.handleChange}>
                            <option key='0' value="0">Select Location</option>
                            { locations }
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Personal Identification Number</label>
                        <input 
                        id="pin-input" 
                        className="form-control" 
                        type="text" 
                        name='personal_identification_number'
                        value={this.state.personal_identification_number} 
                        onChange={this.handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Note</label>
                        <textarea 
                        id="note-input" 
                        className="form-control" 
                        type="text" 
                        name='note'
                        value={this.state.note} 
                        onChange={this.handleChange}/>
                    </div>

                    { button }
                </form>
            </div>
            
        );
    }
}

export default withRouter(PatientFormComponent);