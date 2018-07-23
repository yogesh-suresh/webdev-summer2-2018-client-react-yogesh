import React from 'react';
import ModuleList from './ModuleList';
import CourseService from "../services/CourseService";

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {courseId: '', course: ''};
        this.courseService = CourseService.instance;
    }
    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        this.getCourseById(this.props.match.params.courseId);
    }
    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
        this.getCourseById(newProps.match.params.courseId);
    }
    selectCourse(courseId, course) {
        this.setState({courseId: courseId});
    }
    getCourseById(courseId) {
        this.courseService
            .getCourseById(courseId)
            .then((course) => {
                this.setState({course: course});
            });
    }
    renderTitle() {
        let title = null;
        if(this.state.course.title) {
            return this.state.course.title;
        }
        return (
            title
        )
    }
    render() {
        return (
            <div>
                <h3>Course: {this.renderTitle()}</h3>
                <ModuleList courseId={this.state.courseId}/>
            </div>
        )
    }
}
export default CourseEditor;