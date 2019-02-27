import React, {Component} from 'react';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date
        };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({date: event.target.value});
      }
    
    handleSubmit(event) {
        this.props.updateRecommendations(this.state.date);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                Currently showing recommendations based on avalanche forecast for: 
                <input type="text" name="dateInput" size="12" value={this.state.date} onChange={this.handleChange}></input>
                <input type="submit" value="Update" />
            </form>
        );
    }
}

export default DatePicker;