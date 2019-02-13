import React from 'react';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Avalanche danger</th>
                <th>Name</th>
                <th>Elevation</th>
                <th>Ascent</th>
                <th>Duration</th>
                <th>Terrain complexity</th>
                <th>Description</th>
            </tr>
        </thead>
    );
}

export default TableHeader;