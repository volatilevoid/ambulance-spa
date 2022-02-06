import React, { Component } from 'react';
import Navbar from './layouts/Navbar';
import { Routes, Route } from "react-router-dom";
import DoctorsPage from './pages/admin/DoctorsPage';
import PatientsPage from './pages/admin/PatientsPage';
import ExaminationsPage from './pages/admin/ExaminationsPage';
import LoginPage from './pages/auth/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import axios from 'axios';
import { withRouter } from './routes/withRouter';
import ApiService from './services/ApiService';
import SinglePatientPage from './pages/admin/SinglePatientPage';
import SingleDoctorPage from "./pages/admin/SingleDoctorPage";
import SingleExaminationPage from './pages/admin/SingleExaminationPage';
import { default as DoctorExaminationsPage } from "./pages/doctor/ExaminationsPage";
import { default as DoctorSingleExaminationPage } from "./pages/doctor/SingleExaminationPage";
class Ambulance extends Component {
    authTokenLabel = "amb_auth_token";

    constructor(props) {
        super(props);
        
        this.state = {
            isAuthenticated: false,
            userRole: null,
            auth: {
                username: "",
                password: "",
            },
            errorMessage: ''
        };

        this.isUserAuthenticated.bind(this);
    }

    componentDidMount() {
        this.isUserAuthenticated();
    }

    isUserAuthenticated() {
        let isUserAuthenticated = false;
        const token = localStorage.getItem(this.authTokenLabel);

        if (token !== null) {

            ApiService.getInstance().apiGet('check-token')
                .then(response => {
                    let endpoint = response.data.user_role + '/examinations';

                    if (response.data.is_token_valid === true) {
                        isUserAuthenticated = true;
                        this.setState({
                            isAuthenticated: isUserAuthenticated,
                            userRole: response.data.user_role
                        });
                        
                        this.props.navigate(endpoint);
                    } else {
                        this.props.navigate('login');
                    }

                });

        }
    }

    handleUserLogin = (formData) => {
        axios.get("http://ambulance.local/sanctum/csrf-cookie")
            .then((response) => {
                return ApiService.getInstance().apiPost("login", {
                    ...formData,
                });
            })
            .then((response) => {
                // Navigate to main page
                let endpoint = response.data.user_role + '/examinations';
                
                if (response.data.success) {
                    localStorage.setItem(
                        this.authTokenLabel,
                        response.data.access_token
                    );
                    this.setState({
                        userRole: response.data.user_role,
                        isAuthenticated: true,
                        errorMessage: ''
                    });
                    this.props.navigate(endpoint);
                } else {
                    this.setState({errorMessage: response.data.message});
                }
            });
    };

    handleUserLogout = () => {
        const token = localStorage.getItem(this.authTokenLabel);
        
        ApiService.getInstance().setToken(token);

        ApiService.getInstance()
            .apiPost("logout")
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        isAuthenticated: false,
                    });
                    localStorage.removeItem(this.authTokenLabel);
                }
            });
    };

    render() {
        return (
            <div className="d-flex flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <Navbar
                        showNav={this.state.isAuthenticated}
                        userRole={this.state.userRole}
                        onLogoutBtnClicked={this.handleUserLogout}
                    />
                </div>
                <div className="col p-3 d-flex align-items-start justify-content-center">
                    
                    <Routes>
                        <Route
                            path="login"
                            element={
                                <LoginPage errorMessage={this.state.errorMessage} onUserLogin={this.handleUserLogin} />
                            } />
                        <Route path="admin">
                            <Route
                                path="examinations"
                                element={
                                    <ProtectedRoute
                                        isAuth={ this.state.isAuthenticated }>
                                        <ExaminationsPage />
                                    </ProtectedRoute>
                                } />
                            <Route
                                path="examinations/:id"
                                element={
                                    <ProtectedRoute
                                        isAuth={ this.state.isAuthenticated }>
                                        <SingleExaminationPage />
                                    </ProtectedRoute>
                                } />
                            <Route
                                path="doctors"
                                element={
                                    <ProtectedRoute
                                        isAuth={ this.state.isAuthenticated }>
                                        <DoctorsPage />
                                    </ProtectedRoute>
                                } />
                            <Route
                                path="doctors/:id"
                                element={
                                    <ProtectedRoute
                                        isAuth={ this.state.isAuthenticated }>
                                        <SingleDoctorPage />
                                    </ProtectedRoute>
                                } />
                            <Route
                                path="patients"
                                element={
                                    <ProtectedRoute
                                        isAuth={ this.state.isAuthenticated }>
                                        <PatientsPage />
                                    </ProtectedRoute>
                                } />
                            <Route
                                path="patients/:id"
                                element={
                                    <ProtectedRoute
                                        isAuth={ this.state.isAuthenticated }>
                                        <SinglePatientPage />
                                    </ProtectedRoute>
                                } />
                        </Route>

                        <Route path="doctor">
                            <Route
                                path="examinations"
                                element={
                                    <ProtectedRoute
                                        isAuth={ this.state.isAuthenticated }>
                                        <DoctorExaminationsPage />
                                    </ProtectedRoute>
                                } />
                            <Route
                                path="examinations/:id"
                                element={
                                    <ProtectedRoute
                                        isAuth={ this.state.isAuthenticated }>
                                        <DoctorSingleExaminationPage />
                                    </ProtectedRoute>
                                } />
                        </Route>
                    </Routes>
                </div>
            </div>
        );
    }
}

export default withRouter(Ambulance);