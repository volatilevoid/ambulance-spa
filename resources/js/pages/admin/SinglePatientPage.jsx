import React, { Component } from 'react';
import PatientFormComponent from '../../components/admin/PatientFormComponent';
import { withRouter } from '../../routes/withRouter';

class SinglePatientPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };

    }

    render() {
        return (
            <div>
                <PatientFormComponent />
            </div>

        );
    }
}

export default withRouter(SinglePatientPage);