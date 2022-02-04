import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        if(!this.props.showNav) {
                return <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'></div>;
                
        }
        
        return (
                <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                                
                    {/* <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline">Admin/Dr</span>
                    </a> */}

                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li className="nav-item">
                            <Link to="/admin/examinations" className="nav-link align-middle px-0">
                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Examinations</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/doctors" className="nav-link px-0 align-middle">
                                <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Doctors</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/patients" className="nav-link px-0 align-middle">
                                <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Patients</span>
                            </Link>
                        </li>
                    </ul>

                    <div>
                        user(profile etc.)
                    </div>

                </div>
        );
    }
}

export default Navbar;