import React from 'react'

class TopicPills extends React.Component {
    render() {
        return(
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <a className="nav-link active" href="#">Topic 1</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Topic 2</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Topic 3</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
        )
    }
}

export default TopicPills;