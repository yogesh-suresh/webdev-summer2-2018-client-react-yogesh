import React from 'react';
import { NavLink } from 'react-router-dom'

export default class ModuleListItem
    extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li className="list-group-item">
                <NavLink to={`/course/${this.props.courseId}/module/${this.props.module.id}`}
                         activeStyle={{
                             fontWeight: 'bold',
                             color: 'blue'
                         }}>
                    {this.props.module.title}
                </NavLink>
                <span className="float-right">
                <button className='btn btn-danger btn-sm'
                        onClick={(event) =>
                        {this.props.delete
                        (event, this.props.courseId, this.props.module.id)}}>
                    <i className="fa fa-times"></i>
                </button>
                </span>
            </li>
        );}}