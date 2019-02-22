import React, {Component} from 'react';

class TableRow extends Component {
    render() {
        return (
            <tr className={this.props.rowData.recommendation}>
                <td>{this.props.rowData.recommendation}</td>
                <td>{this.props.rowData.avalancheDanger}</td>
                <td>{this.props.rowData.name}</td>
                <td>{this.props.rowData.elevation}</td>
                <td>{this.props.rowData.ascent}</td>
                <td>{this.props.rowData.duration}</td>
                <td>{this.props.rowData.terrainComplexity}</td>
                <td>{this.props.rowData.description}</td>
            </tr>
        );
    }
}

export default TableRow;
