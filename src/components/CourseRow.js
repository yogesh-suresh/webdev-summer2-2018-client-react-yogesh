import React from 'react';
import {Link} from 'react-router-dom';
import CourseService from "../services/CourseService";

class CourseRow extends React.Component {

    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
    }
    render() {
        return (
            <tr>
                <td className="td-color">
                    <i className="fa fa-file-text  fa-2x" aria-hidden="true"></i>
                    <Link to={`/course/${this.props.course.id}`} className="table-hover" id={this.props.course.id}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td align="center" ><b>
                    {'Me'}

                </b>
                </td>
                <td align="center" className="td-color"> <b>
                   {/*{this.props.course.modified});*/}
                    {this.props.course.modified.replace("T"," ").split('.000+0000')}

                </b>
                </td>
                <td>
                    <i className="fa fa-trash fa-2x" aria-hidden="true" onClick={this.props.deleteCourseHandler}>
                    </i>
                    <span style={{marginLeft:'20px'}}>
                    <i className="fa fa-pencil fa-2x" aria-hidden="true" onClick={this.props.updateCourseHandler}>
                    </i>
                    </span>
                </td>
            </tr>
        )
    }
}
export default CourseRow;