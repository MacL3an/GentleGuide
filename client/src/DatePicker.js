import React, {Component} from 'react';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date
        };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.oneDayAhead = this.oneDayAhead.bind(this);
    this.oneDayBack = this.oneDayBack.bind(this);
    }
    
    handleChange(event) {
        this.setState({date: event.target.value});
      }
    
    handleSubmit(event) {
        console.log('submitting');
        // this.handleChange(event);
        this.props.updateRecommendations(this.state.date);
        event.preventDefault();
    }

    oneDayAhead() {
        console.log("forward: " + this.state.date);
        let currentDate = new Date(this.state.date + " GMT"); //TODO: Fix for all time zones
        currentDate.setDate(currentDate.getDate() + 1)
        this.setState({date: currentDate.toISOString().substr(0, 10)});
    }

    oneDayBack() {
        console.log("back: " + this.state.date);
        let currentDate = new Date(this.state.date + " GMT");
        currentDate.setDate(currentDate.getDate() - 1)
        this.setState({date: currentDate.toISOString().substr(0, 10)});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                Currently showing recommendations based on avalanche forecast for: 
                <button onClick={this.oneDayBack}>&larr;</button>
                <input type="text" name="dateInput" size="12" value={this.state.date} onChange={this.handleChange}></input>
                <button onClick={this.oneDayAhead}>&rarr;</button>
            </form>
        );
    }
}

export default DatePicker;