import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class ExaminationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            examinations: []
         };
    }

    componentDidMount() {
        this.fetchExaminations();
      }
  
    fetchExaminations() {
        axios.get('http://ambulance.local/api/doctor/examinations')
        .then(response => {
            const examinations = response.data.examinations.map(examination => {
                const formattedDatetime = new Date(examination.scheduled_appointment);
                
                examination.scheduled_appointment = formattedDatetime.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}).replaceAll('/', '.')
                examination.is_completed = examination.is_completed != 0;

                return examination;
            });
            this.setState({
                examinations: examinations
            });
        });
    }

    render() {
        const rows = this.state.examinations.map( examination => 
            <tr key={examination.id}>
                <th scope='row'>{examination.id}</th>
                <td>{examination.patient}</td>
                <td>{examination.scheduled_appointment}</td>
                <td>
                    <div className="dropdown">
                        <button id="dropdownMenuButton1" className='btn btn-outline-primary dropdown-toggle mx-1' data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-gear-fill"></i></button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <Link to={`/doctor/examinations/${examination.id}`} className='dropdown-item'>
                                    Edit
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
                <div><h1>Examinations</h1></div>
            </div>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Patient</th>
                    <th scope='col'>Scheduled For</th>
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

export default ExaminationsPage;