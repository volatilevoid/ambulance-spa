import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    handleLogout = () => {
        this.props.onLogoutBtnClicked();
    }

    render() {
        console.log(this);
        if(!this.props.showNav) {
                return <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'></div>;
                
        }
        let links = '';

        if(this.props.userRole === 'admin') {
            links = (
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li className="nav-item">
                            <Link to="/admin/examinations" className="nav-link align-middle px-0">
                                <i className="fs-4 bi bi-table"></i> <span className="ms-1 d-none d-sm-inline">Examinations</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/doctors" className="nav-link px-0 align-middle">
                                <i className="fs-4 bi bi-person-heart"></i> <span className="ms-1 d-none d-sm-inline">Doctors</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/patients" className="nav-link px-0 align-middle">
                                <i className="fs-4 bi bi-people"></i> <span className="ms-1 d-none d-sm-inline">Patients</span>
                            </Link>
                        </li>
                    </ul>
            );
        }

        if (this.props.userRole === 'doctor') {
            links = (
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li className="nav-item">
                            <Link to="/doctor/examinations" className="nav-link align-middle px-0">
                                <i className="fs-4 bi bi-table"></i> <span className="ms-1 d-none d-sm-inline">Examinations</span>
                            </Link>
                        </li>
                    </ul>
                );
        }
        
        return (
                <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                    { links }
                    <div className='my-4'>
                        <button type="button" className="btn btn-outline-danger" onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
        );
    }
}

export default Navbar;