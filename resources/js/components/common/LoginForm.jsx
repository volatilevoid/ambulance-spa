import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: ''
         };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        this.props.onFormsubmit(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input 
                        id="username-input"
                        className="form-control"
                        type="text"
                        name='username'
                        value={this.props.username}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                        id="password-input"
                        className="form-control"
                        type="password"
                        name='password'
                        value={this.props.password}
                        onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>

        );
    }
}


export default LoginForm;