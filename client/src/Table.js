import React, {Component} from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

class Table extends Component {
    render() {
        return (
            <table>
                <TableHeader />
                <TableBody routesData = {this.props.routesData} date = {this.props.date} />
            </table>
        );
    }
}

export default Table;