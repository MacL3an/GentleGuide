import React, {Component} from 'react';

class DatePicker extends Component {
    render() {
        return (
            <p>Currently showing recommendations based on avalanche forecast for: {this.props.date}.</p>
        );
    }
}

export default DatePicker;