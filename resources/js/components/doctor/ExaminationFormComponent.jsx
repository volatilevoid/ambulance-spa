import React, { Component } from 'react';
import { withRouter } from '../../routes/withRouter';
import ApiService from '../../services/ApiService';

class ExaminationFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: 0,
            patient: '',
            scheduled_appointment: '',
            diagnosis: '',
            is_completed: false
         };
    }
    
    componentDidMount() {
        if (this.props.params.id != 0) {
            ApiService.getInstance().apiGet(`doctor/examinations/${this.props.params.id}`)
                .then(response => {
                   this.setState({
                    id: response.data.examination.id,
                    patient: response.data.examination.patient,
                    scheduled_appointment: response.data.examination.scheduled_appointment,
                    diagnosis: response.data.examination.diagnosis,
                   });
                });
        }
    }

    handleChange = (event) => {
        if(event.target.name === 'is_completed') {
            this.setState({
                [event.target.name]: event.target.checked
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value
            });
            
        }


        if (this.state.submit_disabled) {
            this.setState({
                submit_disabled: false
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        ApiService.getInstance().apiPost('doctor/examinations', {
            id: this.state.id,
            diagnosis: this.state.diagnosis,
            is_completed: this.state.is_completed,
        }).then(response => {
            if (response.data.success) {
                this.props.navigate(-1);
            }
        });
    }

    render() {
     
        const button = this.state.id === 0 ? 
            <button type="submit" disabled={this.state.submit_disabled} className="btn btn-primary">Create</button> :
            <button type="submit" className="btn btn-primary">Submit</button>
        let headerContent = this.state.id === 0 ? 'Create examination' : 'Update examination'

        return (
            <div >
                <h1>{ headerContent }</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Patient</label>
                        <input 
                        id="patient" 
                        className="form-control" 
                        type="text"
                        readOnly 
                        name='patient'
                        value={this.state.patient}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Appointment date & time</label>
                        <input 
                        id="scheduled-appointment-input" 
                        className="form-control" 
                        type="text"
                        readOnly
                        name='scheduled_appointment'
                        value={this.state.scheduled_appointment} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Diagnosis</label>
                        <textarea 
                        id="diagnosis-input" 
                        className="form-control" 
                        type="text" 
                        name='diagnosis'
                        disabled={this.state.is_completed}
                        value={this.state.diagnosis} 
                        onChange={this.handleChange}/>
                    </div>

                    <div className="form-check mb-3">
                        <input 
                        className="form-check-input" 
                        name="is_completed"
                        type="checkbox"
                        checked={this.state.is_completed} 
                        onChange={this.handleChange}
                        id="is-completed-input" />
                        <label className="form-check-label" htmlFor="is-completed-input">
                            Is completed?
                        </label>
                    </div>

                    { button }
                </form>
            </div>
            
        );
    }
}

export default withRouter(ExaminationFormComponent);