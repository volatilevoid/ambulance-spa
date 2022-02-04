import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    handleFormSubmit = (formData) => {
        this.props.onUserLogin(formData);
    }

    render() {
        return (
            <div className='d-flex flex-column'>
                <div className='mb-4'>
                    <p>Test username: user_admin || user_doctor</p>
                    <p>Test password: password</p>
                </div>
                <LoginForm onFormsubmit={this.handleFormSubmit} />
            </div>
        );
    }
}

export default LoginPage;