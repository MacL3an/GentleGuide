import React, {Component} from 'react';

class TableRow extends Component {
    render() {
        return (
            <tr className={this.props.rowData.recommendation}>
                <td>{this.props.rowData.recommendation}</td>
                <td>{(this.props.rowData.avalancheForecast && <a href={this.props.rowData.varsomlink} target="_blank" rel="noopener noreferrer">{this.props.rowData.avalancheForecast.DangerLevel}</a>)}</td>
                <td>{this.props.rowData.name}</td>
                <td>{this.props.rowData.elevation}</td>
                <td>{this.props.rowData.ascent}</td>
                <td>{this.props.rowData.duration}</td>
                <td>{this.props.rowData.terraincomplexity}</td>
                <td>{this.props.rowData.description}</td>
            </tr>
        );
    }
}

export default TableRow;
