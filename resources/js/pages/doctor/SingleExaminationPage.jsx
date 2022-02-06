import React, { Component } from 'react';
import ExaminationFormComponent from "../../components/doctor/ExaminationFormComponent";

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

export default SingleExaminationPage;