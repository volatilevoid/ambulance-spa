import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import Ambulance from './Ambulance';
import ReactDOM from 'react-dom';

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        return (
            <BrowserRouter>
                <Ambulance />
            </BrowserRouter>
        );
    }
}

export default Root;

ReactDOM.render(<Root />, document.getElementById('root'));
