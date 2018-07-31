import React from 'react';
import TopicService from "../services/TopicService"
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import TopicTabItem from "../components/TopicTabItem";
import WidgetListEditor from "./WidgetListEditor";

import {BrowserRouter as Router,Route} from 'react-router-dom'


export default class TopicPill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            topic: {title: ''},
            topics: []
        };

        this.setLessonId = this.setLessonId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setTopicTitle = this.setTopicTitle.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.topicService = TopicService.instance;
    }

    setLessonId(lessonId)
    {
        this.setState({lessonId:lessonId});
    }
    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }
    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }
    setTopicTitle(event) {
        this.setState({topic: {
                title: event.target.value
            }});
    }
    setTopics(topics) {
        this.setState({topics: topics});
    }

    createTopic() {
        let newTopic;
        if(this.state.topic.title === '') {
            newTopic = {title: 'New Topic'};
        } else {
            newTopic = this.state.topic;
        }
        this.topicService
            .createTopic(this.state.courseId, this.state.moduleId, this.state.lessonId, newTopic)
            .then(() => {
                this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId);
            });
        document.getElementById('topicTitleFld').value = '';
        this.setState({topic: {title: ''}});
    }

    deleteTopic(topicId) {
        if(window.confirm('Please confirm the delete?')) {
            this.topicService
                .deleteTopic(topicId)
                .then(() => {
                    this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId);
                });
        }
    }
    componentDidMount() {
        this.setLessonId(this.props.lessonId);
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
    }
    componentWillReceiveProps(newProps) {
        this.setLessonId(newProps.lessonId);
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllTopicsForLesson(newProps.courseId, newProps.moduleId, newProps.lessonId);
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        this.topicService
            .findAllTopicsForLesson(courseId, moduleId, lessonId)
            .then((topics) => {this.setTopics(topics);});
    }
    renderTopics() {
        if(this.state.topics === null) {
            return null;
        }
        let topics = this.state.topics.map((topic) => {
            return <TopicTabItem key={topic.id} topic={topic}  lessonId={this.state.lessonId} moduleId={this.state.moduleId} courseId={this.state.courseId}
                                 delete={this.deleteTopic}/>
        });
        return (topics )
    }

    render() {
        if(this.state.topics === null) {
            return null;
        } else {
            return (
                <div>
                    <ul className="nav nav-pills justify-content-right">
                        {this.renderTopics()}
                        <li id="addLessonFld" className="nav-item">
                                <div className='row'>
                                    <div className='col-8'>
                                        <input className='form-control form-control-sm'
                                               id='topicTitleFld'
                                               placeholder='New Topic'
                                               value={this.state.topic.title}
                                               onChange={this.setTopicTitle}/>
                                    </div>
                                    <div className='col-1'>
                                        <button className='btn btn-success btn-sm'
                                                onClick={this.createTopic}>
                                            <i className="fa fa-plus-square"/>
                                        </button>
                                    </div>
                                </div>
                        </li>
                    </ul>
                    <div>
                        <Route path={`/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId`}
                               component={WidgetListEditor}/>
                    </div>
                </div>
            )
        }
    }
}