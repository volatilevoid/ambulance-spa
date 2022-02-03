import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'sass';


class DoctorsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount() {
        axios.get('http://ambulance.local/api/admin/doctors')
            .then(res => {
                console.log(res);
            });
    }

    render() {
        return (
            <h1>Doctors page</h1>
        );
    }
}

export default DoctorsPage;