import React from 'react';
import CourseRow from '../components/CourseRow';
import CourseService from '../services/CourseService';
let self;

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {courses: [],
                     currCourse:{title:''},
                        updBtnFlag: 'F',
                        courseTrackId: '',
                        style : 'C'
                    };
        self = this;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.gridSelect = this.gridSelect.bind(this);

    }
    titleChanged(event) {
        this.setState({
            course: {title: event.target.value}
        });
    }
    gridSelect() {
        if(this.state.style == 'C')
        {
            this.setState({style: 'G'});}
        else
        {

            this.setState({style: 'C'});
        }
    }

    createCourse() {
        let newCourse;
        if(this.state.updBtnFlag == 'F') {
            if (this.state.course === undefined || this.state.course.title === '') {
                newCourse = {title: 'New Course'};
            } else {
                newCourse = this.state.course;
            }
            newCourse.modified = new Date();
            newCourse.created = new Date();
            this.courseService
                .createCourse(newCourse)
                .then(() => {
                    this.findAllCourses();
                });
            document.getElementById('titleFld').value = '';
        } else {
            alert("Course Title Updated");
            this.state.updBtnFlag = 'F';
            let id = this.state.courseTrackId;
            let newCourse = this.state.course;
            this.courseService
                .updateCourse(id,newCourse)
                .then(() => {
                    this.findAllCourses();
                });
            document.getElementById('titleFld').value = '';

        }
    }
    deleteCourse(event) {
        if(window.confirm('Are you sure you want to delete?')) {
            let id = event.target.closest('tr').getElementsByTagName('td')[0].getElementsByTagName('a')[0].id;
            this.courseService
                .deleteCourse(id)
                .then(() => {this.findAllCourses();});
        }
    }

    updateCourse(event) {

            let newCourse;
            let id = event.target.closest('tr').getElementsByTagName('td')[0].getElementsByTagName('a')[0].id;
            this.state.courseTrackId = id;
            // alert(id);
            this.courseService
              .getCourseById(id)
            .then((newCourse) => {
                this.setState({currCourse: newCourse});
                this.state.updBtnFlag = 'T'
                document.getElementById('titleFld').value = this.state.currCourse.title;
            });

    }
    componentDidMount() {
        this.findAllCourses();
    }
    renderCourseRows() {
        let courses = null;
        let style = this.state.style;
        if(this.state) {
            courses = this.state.courses.map(function(course) {
                return <CourseRow key={course.id}
                                  style={style}
                                  course={course}
                                  deleteCourseHandler={self.deleteCourse}
                                  updateCourseHandler={self.updateCourse}/>
            });
        }
        return (
            courses
        )
    }
    findAllCourses() {
        this.courseService
            .findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            });
    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <h3 className="modal-title">Course List</h3>

                    <button onClick={this.gridSelect}
                            className="btn btn-primary">
                        {/*<span style={{marginLeft:'1100px'}} >*/}
                            <i className="fa fa-th-large"></i>
                    {/*</span>*/}
                    </button>

                    {/*<i className="fa fa-th-large" aria-hidden="true" onClick={this.gridSelect} ></i>*/}


                </div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th className="text-center">Title</th>
                        <th className="text-center">Owner</th>
                        <th className="text-center">Last modified</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            <input onChange={this.titleChanged}
                                   id="titleFld"
                                   className="form-control"
                                   placeholder="Course Name"/>
                        </td>
                        <td align="center"><b>Me</b></td>
                        <td align="center"><b>Today</b></td>
                        <td>
                            <button onClick={this.createCourse}
                                    className="btn btn-primary"><i className="fa fa-plus"></i></button>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default CourseList;