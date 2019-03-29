import React, {Component} from 'react';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date
        };

    this.oneDayAhead = this.oneDayAhead.bind(this);
    this.oneDayBack = this.oneDayBack.bind(this);
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
        return (<div>
                Showing recommendations based on avalanche forecast for <br/><br/>
                    <button type="button" onClick={this.oneDayBack}>&larr;</button>
                    &nbsp;{this.state.date.toISOString().substr(0, 10)}&nbsp;
                    <button type="button" onClick={this.oneDayAhead}>&rarr;</button> <br/><br/>
                </div>
        );
    }
}

export default DatePicker;