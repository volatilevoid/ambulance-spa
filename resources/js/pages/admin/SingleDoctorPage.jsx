import React, { Component } from 'react';
import DoctorFormComponent from '../../components/admin/DoctorFormComponent';
import { withRouter } from '../../routes/withRouter';

class SingleDoctorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    render() {
        return (
            <div>
                <DoctorFormComponent />
            </div>
        );
    }
}

export default withRouter(SingleDoctorPage);