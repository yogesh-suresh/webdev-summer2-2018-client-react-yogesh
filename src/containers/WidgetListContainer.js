import React, {Component} from 'react'
import {connect} from 'react-redux'
import WidgetContainer from '../components/widgets'
import '../Style1.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import * as constants from "../constants";


class WidgetList extends Component {
    constructor(props) {
        super(props)
        this.state = {topicId: ''};
        this.selectTopic = this.selectTopic.bind(this);
        this.saveToServer = this.saveToServer.bind(this);

    }

    componentDidMount() {
        this.selectTopic
        (this.props.topicId);
    }
    componentWillReceiveProps(newProps) {
        this.selectTopic
        (newProps.topicId);
        if(this.props.topicId != newProps.topicId){
            this.props.findAllWidgetsForTopic(newProps.topicId);
        }
    }

    selectTopic(topicId) {
        this.setState({topicId: topicId});
    }

    saveToServer(){

        this.props.save(this.state.topicId);
    }
    render() {
        return(
            <div>
                <div className="container pt-5">
                    <div className="row flex-row-reverse pr-20 pb-15">
                        <div className="d-flex pr-20 m-auto float-right">
                            <h4> Preview   </h4>
                            <label className="switch m-auto">
                                <input type="checkbox" onClick={this.props.preview}/>
                                <span className="slider round"></span>

                            </label>
                        </div>
                        <div className="d-flex pr-20 m-auto float-lg-right">
                            <button className="btn btn-success m-auto" hidden={this.props.previewMode}
                                    onClick={this.saveToServer}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                {this.props.widgets.map(widget => (
                    <WidgetContainer widget={widget}
                                     preview={this.props.previewMode}
                                     key={widget.widgetOrder}
                                     widgetLength={this.props.widgets.length}/>
                ))}
                </div>

            <div className="container pt-1">
                <div className="row flex-row-reverse pr-20 pb-15">
                    <div className="row flex-row-reverse pr-20 pb-15  m-auto">
                        <button className="btn btn-danger" onClick={this.props.addWidget}><i
                            className="fa fa-plus-square"></i>
                        </button>
                    </div>
                </div>
            </div>
         </div>
        )
    }
}

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
})


const dispatcherToPropsMapper = dispatch => ({



    findAllWidgetsForTopic: (topicId)  => {
        fetch('https://safe-falls-17862.herokuapp.com/api/topic/'+topicId+"/widget")
            .then(response => (response.json()))
            .then(widgets => dispatch({
                type: constants.FIND_ALL_WIDGETS_FOR_TOPIC,
                widgets: widgets }))
        },



    addWidget: () => dispatch({
        type: constants.ADD_WIDGET
        }),

    save: (topicId) => dispatch({
        type: constants.SAVE,
        topicId : topicId
        }),

    preview: () => dispatch({
        type: constants.PREVIEW
    })
})

const WidgetListContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList)

export default WidgetListContainer