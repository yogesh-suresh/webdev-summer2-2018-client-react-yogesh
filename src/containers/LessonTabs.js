import React from 'react';
import LessonService from "../services/LessonService";
import LessonTabItem from "../components/LessonTabItem"
import LessonEditor from "../containers/LessonEditor"
import {Route} from 'react-router-dom';

class LessonTabs extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            moduleId : '',
            courseId : '',
            lesson: {title: ''},
            lessons: []
        };
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.setLessons = this.setLessons.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.lessonService = LessonService.instance;

    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }
    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setLessons(lessons) {
        console.log("SetLessons");
        this.setState({lessons: lessons});
    }

    setLessonTitle(event) {
        console.log(event.target.value);
        this.setState({lesson: {title: event.target.value}});
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId);
    }

    findAllLessonsForModule(courseId, moduleId) {
        this.lessonService
            .findAllLessonsForModule(courseId, moduleId)
            .then((lessons) => {this.setLessons(lessons)});

    }

    deleteLesson(lessonId) {
        if(window.confirm('Are you sure you want tox delete?')) {
            this.lessonService
                .deleteLesson(lessonId)
                .then(() => {
                    this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
                });
        }
    }

    createLesson() {
        let newLesson;
        if(this.state.lesson.title === '') {
            newLesson = {title: 'New Lesson'};
        } else {
            newLesson = this.state.lesson;
        }
        this.lessonService
            .createLesson(this.state.courseId, this.state.moduleId, newLesson)
            .then(() => {
                this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
            });
        document.getElementById('lessonTitleFld').value = '';
        this.setState({lesson: {title: ''}});

    }
    renderLessons() {

        if(this.state.lessons === null) {
            return null;
        }

        let lessons = this.state.lessons.map((lesson) => {
            return <LessonTabItem key={lesson.id} lesson={lesson} moduleId={this.state.moduleId} courseId={this.state.courseId}  delete={this.deleteLesson}/>
        });

        return  lessons ;


    }
    renderTopics() {
        return <Route path='/course/:courseId/module/:moduleId/lesson/:lessonId' component={LessonEditor}/>;
    }

    render(){
        if(this.state.lessons === null) {
            return null;

        } else {
            return (
                <div>
                    <h3>Lesson Tabs</h3>
                    <ul className="nav nav-tabs justify-content-right">
                        {this.renderLessons()}
                        <li id="addLessonFld" className="nav-item">
                            <div className='row'>
                                <div className='col-8'>
                                    <input className='form-control form-control-sm'
                                           id='lessonTitleFld'
                                           placeholder='New Lesson'
                                           value={this.state.lesson.title}
                                           onChange={this.setLessonTitle}/>
                                </div>
                                <div className='col-1'>
                                    <button className='btn btn-success btn-sm'
                                            onClick={this.createLesson}>
                                        <i className="fa fa-plus-square"/>
                                    </button>
                                </div>
                            </div>
                        </li>

                    </ul>
                    <div className='col-8'>
                        {this.renderTopics()}
                    </div>
                </div>
            )
        }
    }
}

export default LessonTabs;