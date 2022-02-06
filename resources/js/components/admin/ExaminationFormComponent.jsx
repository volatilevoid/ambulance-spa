import React, { Component } from 'react';
import { withRouter } from '../../routes/withRouter';
import ApiService from '../../services/ApiService';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes } from "date-fns";

class ExaminationFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: 0,
            patient_id: 0,
            user_id: 0,
            scheduled_appointment: new Date(),
            diagnosis: '',
            is_completed: false,
            submit_disabled: true,
            doctors: [],
            patients: [],
            unavailable_dates: [],
            unavailable_times: []
         };

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

        if (event.target.name === 'user_id') {
            this.fetchUnavailableDates(event.target.value);
        }

    }

    handleSubmit = (event) => {
        event.preventDefault();
        ApiService.getInstance().apiPost('admin/examinations', {
            id: this.state.id,
            patient_id: this.state.patient_id,
            user_id: this.state.user_id,
            scheduled_appointment: this.state.scheduled_appointment.toLocaleString(),
            diagnosis: this.state.diagnosis,
            is_completed: this.state.is_completed,
        }).then(response => {
            if (response.data.success) {
                this.props.navigate(-1);
            }
        });
    }

    componentDidMount() {
        // get all doctors
        ApiService.getInstance().apiGet('admin/doctors')
            .then(response => {
                this.setState({
                    doctors: response.data.doctors
                });
            });
            
        // get all patients
        ApiService.getInstance().apiGet('admin/patients')
            .then(response => {
                this.setState({
                    patients: response.data.patients
                });
            });

        if (this.props.params.id != 0) {
            ApiService.getInstance().apiGet(`admin/examinations/${this.props.params.id}`)
                .then(response => {
                    this.setState({
                        id: response.data.examination.id,
                        patient_id: response.data.examination.patient_id,
                        user_id: response.data.examination.user_id,
                        diagnosis: response.data.examination.diagnosis,
                        scheduled_appointment: new Date(response.data.examination.scheduled_appointment),
                        is_completed: response.data.examination.is_completed
                    });
                });
        }

        this.fetchUnavailableDates();
    }

    fetchUnavailableDates(doctorID) {
        if(doctorID == 0) {
            this.setState({
                unavailable_dates: []
            });
        } else {
            // ApiService.getInstance().apiGet('unavailable-examination-dates', {user_id: doctorID})
            // .then(response => {
            //     this.setState({
            //         unavailable_dates: response.data.dates
            //     });
            // });
        }
    }

    handleDatepicker = (date) => {
        this.setState({
            scheduled_appointment: date
        });
    }
    // TODO
    setUnavailableTimes() {}


    render() {
        const areDoctorOrPatientUnselected = !(this.state.user_id != 0 && this.state.patient_id != 0);
        const doctors = this.state.doctors.map(doctor => <option key={doctor.id} value={doctor.id}>{`${doctor.id}: ${doctor.name} ${doctor.last_name}`}</option>);
        const patients = this.state.patients.map(patient => <option key={patient.id} value={patient.id}>{`${patient.id}: ${patient.name} ${patient.last_name}`}</option>);
        const button = this.state.id === 0 ? 
            <button type="submit" disabled={this.state.submit_disabled || areDoctorOrPatientUnselected} className="btn btn-primary">Create</button> :
            <button type="submit" disabled={areDoctorOrPatientUnselected} className="btn btn-primary">Submit</button>
        let headerContent = this.state.id === 0 ? 'Create examination' : 'Update examination'

        return (
            <div >
                <h1>{ headerContent }</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="mb-3">
                        <label>Select Doctor</label>
                        <select className='form-select' name='user_id' value={this.state.user_id} onChange={this.handleChange}>
                            <option key="0" value="0" disabled>Select Doctor</option>
                            { doctors }
                        </select>
                    </div>

                    <div className="mb-3">
                        <label>Select Patient</label>
                        <select className='form-select' name='patient_id' value={this.state.patient_id} onChange={this.handleChange}>
                            <option key="0" value="0" disabled>Select Patient</option>
                            { patients }
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Appointment date & time</label>
                        <DatePicker 
                        disabled={this.state.user_id === 0}
                        selected={this.state.scheduled_appointment}
                        onChange={this.handleDatepicker}
                        showTimeSelect
                        minDate={new Date()}
                        timeFormat="HH:mm"
                        dateFormat="dd.MM.yyyy HH:mm"
                        excludeDates={this.state.unavailable_dates}
                        excludeTimes={this.state.unavailable_times}
                        timeIntervals="10"
                        showTimeSelect/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Diagnosis</label>
                        <textarea 
                        id="diagnosis-input" 
                        className="form-control" 
                        type="text" 
                        name='diagnosis'
                        disabled={this.state.id == 0 || this.state.is_completed}
                        value={this.state.diagnosis} 
                        onChange={this.handleChange}/>
                    </div>

                    <div className="form-check mb-3">
                        <input 
                        className="form-check-input" 
                        name="is_completed"
                        type="checkbox"
                        disabled={this.state.id == 0}
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