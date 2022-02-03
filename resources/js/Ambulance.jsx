import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './layouts/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorsPage from './pages/admin/DoctorsPage';
import PatientsPage from './pages/admin/PatientsPage';
import ExaminationsPage from './pages/admin/ExaminationsPage';

class Ambulance extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                <div className='d-flex flex-nowrap'>

                    <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>

                        <Navbar />

                    </div>
                    
                    <div className='col py-3'>
                    <Routes>
                        <Route path="examinations" element={<ExaminationsPage />} />
                        <Route path="doctors" element={<DoctorsPage />} />
                        <Route path="patients" element={<PatientsPage />} />
                    </Routes>
                    </div>

                </div>
                </BrowserRouter>
            </div>

        );
    }
}

export default Ambulance;

ReactDOM.render(<Ambulance />, document.getElementById('root'));