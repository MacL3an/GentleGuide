import React from 'react';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Recommendation</th>
                <th>Avalanche danger</th>
                <th>Elevation</th>
                <th>Ascent</th>
                <th>Duration</th>
                <th>Description</th>
            </tr>
        </thead>
    );
}

export default TableHeader;