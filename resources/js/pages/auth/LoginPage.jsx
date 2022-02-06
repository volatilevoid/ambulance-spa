import React, { Component } from 'react';
import LoginForm from '../../components/common/LoginForm';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    handleFormSubmit = (formData) => {
        this.props.onUserLogin(formData);
    }

    render() {
        let errors = '';
        
        if (this.props.errorMessage) {
            errors = <div className='d-flex'> { Object.keys(this.props.errorMessage).map(key => <p className='text-danger my-2' key={key}>{this.props.errorMessage[key]}</p>) } </div>;
        }

        return (

            <div className='d-flex flex-column'>
                <div className='mb-4'>
                    <p>Initial test admin credentials: user_admin, password_admin</p>
                    <p>Initial test doctor credentials: user_doctor, password_doctor</p>
                </div>
                <LoginForm onFormsubmit={this.handleFormSubmit} />
                { errors }
            </div>
        );
    }
}

export default LoginPage;