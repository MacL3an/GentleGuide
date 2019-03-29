import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { RecommendationEnum } from './recommendations.js'

class TableRow extends Component {
    render() {
        const link = this.props.rowData.varsomlink + this.props.date;
        return (
            <tr className={this.props.rowData.recommendation && RecommendationEnum.properties[this.props.rowData.recommendation].className}>
                <td><Link to={`details/${this.props.rowData.name}`}>{this.props.rowData.name}</Link></td>
                <td>{this.props.rowData.recommendation && RecommendationEnum.properties[this.props.rowData.recommendation].name}</td>
                <td>{(this.props.rowData.avalancheForecast && <a href={link} target="_blank" rel="noopener noreferrer">{this.props.rowData.avalancheForecast.DangerLevel}</a>)}</td>
                <td>{this.props.rowData.elevation}</td>
                <td>{this.props.rowData.ascent}</td>
                <td>{this.props.rowData.duration}</td>
                <td>{this.props.rowData.description}</td>
            </tr>
        );
    }
}

export default TableRow;
