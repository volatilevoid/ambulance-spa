import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './layouts/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorsPage from './pages/admin/DoctorsPage';
import PatientsPage from './pages/admin/PatientsPage';
import ExaminationsPage from './pages/admin/ExaminationsPage';
import LoginPage from './pages/auth/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import axios from 'axios';
import ApiService from './services/ApiService';

class Ambulance extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            isAuthenticated: false,
            userRole: null,
            auth: {
                username: '',
                password: ''
            }
        };

        this.isUserAuthenticated.bind(this);
    }

    componentDidMount() {
        this.isUserAuthenticated();
    }

    isUserAuthenticated() {
        let isUserAuthenticated = false;

        const token = localStorage.getItem('amb_auth_token');

        if(token !== null ) {
            isUserAuthenticated = true;
        }

        this.setState({
            isAuthenticated: isUserAuthenticated
        });
    }

    handleUserLogin = (formData) => {
        console.log(formData);
        
        axios.get('http://ambulance.local/sanctum/csrf-cookie').then (response => {
            return ApiService.getInstance().apiPost('login', {...formData})
        }).then(response => {
            console.log('response', response);

            if(response.data.success) {
                localStorage.setItem('amb_auth_token', response.data.access_token);
                
                this.setState({
                    userRole: response.data.userRole,
                    isAuthenticated: true
                });
            }
        });
        
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                <div className='d-flex flex-nowrap'>

                    <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
                        <Navbar showNav={this.state.isAuthenticated} userRole={this.state.userRole}/>
                    </div>
                    
                    <div className='col py-3 d-flex align-items-center justify-content-center'>
                        <Routes>
                            <Route path='login' element={<LoginPage onUserLogin={this.handleUserLogin}/>}/>
                                
                            
                            <Route path="admin">
                                <Route path="examinations" element={
                                    <ProtectedRoute>
                                        <ExaminationsPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="doctors" element={
                                    <ProtectedRoute>
                                        <DoctorsPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="patients" element={
                                    <ProtectedRoute>
                                        <PatientsPage />
                                    </ProtectedRoute>
                                } />
                            </Route>
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