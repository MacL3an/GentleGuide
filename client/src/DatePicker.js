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
        console.log('onchange');
        this.setState({date: event.target.value});
      }
    
    handleSubmit(event) {
        console.log('submitting');
        // this.handleChange(event);
        console.log(this.state.date);
        this.props.updateRecommendations(this.state.date);
        event.preventDefault();
    }

    oneDayAhead() {
        console.log("forward: " + this.state.date);
        let dateCopy = new Date(this.state.date.getTime());
        dateCopy.setDate(dateCopy.getDate() + 1);
        this.setState({date: dateCopy});
        this.props.updateRecommendations(dateCopy);
    }

    oneDayBack() {
        console.log("back: " + this.state.date);
        let dateCopy = new Date(this.state.date.getTime());
        dateCopy.setDate(dateCopy.getDate() - 1);
        this.setState({date: dateCopy});
        this.props.updateRecommendations(dateCopy);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                Currently showing recommendations based on avalanche forecast for: 
                <button type="button" onClick={this.oneDayBack}>&larr;</button>
                <input type="text" name="dateInput" size="12" value={this.state.date.toISOString().substr(0, 10)} onChange={this.handleChange}></input>
                <button type="button" onClick={this.oneDayAhead}>&rarr;</button>
            </form>
        );
    }
}

export default DatePicker;