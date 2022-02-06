import React, { Component } from 'react';
import ExaminationFormComponent from '../../components/admin/ExaminationFormComponent';
import { withRouter } from '../../routes/withRouter';

class SingleExaminationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    


    render() {
        return (
            <div>
                <ExaminationFormComponent />
            </div>
        );
    }
}

export default withRouter(SingleExaminationPage);