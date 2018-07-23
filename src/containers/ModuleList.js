import React from 'react';
import ModuleService from "../services/ModuleService";
import ModuleListItem from '../components/ModuleListItem';
import ModuleEditor from './ModuleEditor';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: {title: ''},
            modules: []
        };
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.moduleService = ModuleService.instance;
    }
    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }
    setModuleTitle(event) {
        console.log(event.target.value);
        this.setState({module: {
                title: event.target.value
            }});
    }
    createModule() {
        let newModule;
        if(this.state.module.title === '') {
            newModule = {title: 'New Module'};
        } else {
            newModule = this.state.module;
        }
        this.moduleService
            .createModule(this.state.courseId, newModule)
            .then(() => {
                this.findAllModulesForCourse(this.state.courseId);
            });
        document.getElementById('moduleTitleFld').value = '';
        this.setState({module: {title: ''}});
    }
    deleteModule(event, courseId, moduleId) {
        event.stopPropagation();
        if(window.confirm('Are you sure you want to delete?')) {
            this.moduleService
                .deleteModule(courseId, moduleId)
                .then(() => {
                    this.findAllModulesForCourse(courseId);
                });
        }
    }
    findAllModulesForCourse(courseId) {
        this.moduleService.findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }
    setModules(modules) {
        this.setState({modules: modules});
    }
    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }
    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
    }
    renderModules() {
        let modules = this.state.modules.map((module) => {
            return <ModuleListItem key={module.id} module={module} delete={this.deleteModule} courseId={this.state.courseId}/>
        });
        return (
            <u1>{modules}</u1>
        )
    }
    renderLessons() {
        return <Route path='/course/:courseId/module/:moduleId' component={ModuleEditor}/>;
    }
    render() {
        return (
            <Router>
                <div className='row'>
                    <div className="col-4">

                        <h4 align="center">Modules for Course ID:
                            {this.state.courseId}</h4>
                        <ul className='list-group'>
                            <li className='list-group-item'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-10'>
                                            <input className="form-control"
                                                   id="moduleTitleFld"
                                                   onChange={this.setModuleTitle}
                                                   value={this.state.module.title}
                                                   placeholder="Module Name"/>
                                        </div>
                                        <div className='col-2'>
                                            <button
                                                className="btn btn-success"
                                                onClick={this.createModule}>
                                                <i className=
                                                       "fa fa-plus-square"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <br/>

                            {this.renderModules()}
                        </ul>
                    </div>
                    <div className='col-8'>
                        {this.renderLessons()}
                    </div>
                </div>
            </Router>
        )
    }
}