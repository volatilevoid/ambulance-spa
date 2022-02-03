import axios from 'axios';
import React, { Component } from 'react';

class ExaminationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount() {
        axios.get('http://ambulance.local/api/admin/examinations')
            .then(res => {
                console.log(res);
            });
    }

    render() {
        return (
            <h1>Examinations Page</h1>
        );
    }
}

export default ExaminationsPage;