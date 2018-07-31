import React  from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/index"
import * as HeadingAction from '../actions/HeadingAction'
import * as ListAction from '../actions/ListAction'
import * as LinkAction from '../actions/LinkAction'
import * as ParagraphAction from '../actions/ParagraphAction'
import * as ImageAction from '../actions/ImageAction'
import * as constants from '../constants'
import Heading from '../containers/widgets/Heading'
import Paragraph from '../containers/widgets/Paragraph'
import Image from '../containers/widgets/Image'
import List from '../containers/widgets/List'
import Link from '../containers/widgets/Link'

//Heading Widget Container & mapper
const dispatchToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) =>
        HeadingAction.headingTextChanged(dispatch, widgetId, newText),
    headingNameChanged: (widgetId, newName) =>
        HeadingAction.headingNameChanged(dispatch, widgetId, newName),
    headingSizeChanged: (widgetId, newSize) =>
        HeadingAction.headingSizeChanged(dispatch, widgetId, newSize)
})

const stateToPropsMapper = state => ({
    preview: state.preview
})

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading)


//Paragrpah Widget Container & Mapper
const dispatchToPropsMapperPara = dispatch =>
    ({
        paraTextChanged: (widgetId, newText) =>
            ParagraphAction.paraTextChanged(dispatch,widgetId, newText),
        paraNameChanged: (widgetId, newName) =>
            ParagraphAction.paraNameChanged(dispatch,widgetId, newName)
    })

const stateToPropsMapperPara = state => ({
    preview: state.preview
})

const ParaContainer = connect(stateToPropsMapperPara,dispatchToPropsMapperPara)(Paragraph)


//Image Widget Container & Mapper
const stateToPropsMapperImage = state => ({
    preview: state.preview
})

const dispatchToPropsMapperImage = dispatch =>
    ({
        imageTextChanged: (widgetId, imageText) =>
            ImageAction.imageTextChanged(dispatch,widgetId, imageText),
        imageNameChanged: (widgetId, imageName) =>
            ImageAction.imageNameChanged(dispatch,widgetId, imageName)
    })

const ImageContainer = connect(stateToPropsMapperImage,dispatchToPropsMapperImage)(Image)


//List Widget Container & Mapper & Order
const stateToPropsMapperList = state => ({
    preview: state.preview
})

const dispatchToPropsMapperList = dispatch =>
    ({
        listTextChanged: (widgetId, newListText) =>
            ListAction.listTextChanged(dispatch,widgetId,newListText),
        listNameChanged: (widgetId, newListName) =>
            ListAction.listNameChanged(dispatch,widgetId,newListName),
        listTypeChanged: (widgetId,listType) =>
            ListAction.listTypeChanged(dispatch,widgetId,listType)
    })

const ListContainer = connect(stateToPropsMapperList,dispatchToPropsMapperList)(List)



//Link  Widget Container & Mapper

const stateToPropsMapperLink = state => ({
    preview: state.preview
})

const dispatchToPropsMapperLink = dispatch =>
    ({
        linkTextChanged: (widgetId, linkText) =>
            LinkAction.linkTextChanged(dispatch,widgetId, linkText),
        linkDispChanged: (widgetId, linkDispText) =>
            LinkAction.linkDispChanged(dispatch,widgetId, linkDispText),
        linkNameChanged: (widgetId, linkName) =>
            LinkAction.linkNameChanged(dispatch,widgetId, linkName)
    })

const LinkContainer = connect(stateToPropsMapperLink,dispatchToPropsMapperLink)(Link)


//Widget Container & Mapper
const Widget = ({widget, preview, dispatch,widgetLength}) => {
    let selectElement
    return(

        <div>
        <div hidden={preview}>
            <div className="container widget-container"
                 style={widgetContainerStyle}>
                <div className="row">
                    <div className="col-md-12 text-dark pt-2">
                        <div className="row flex-row pb-1">
                            <div className="col-md-3 d-inline-flex">
                                <h4>{widget.widgetType}</h4></div>
                            <div className="col-md-9">

                                <div className="d-inline-flex pr-2 float-right">
                                    <button onClick={e => (
                                        dispatch({type: DELETE_WIDGET, id: widget.id})
                                    )} className="btn btn-danger"><i className="fa fa-times"></i></button>
                                </div>


                                <div className="d-inline-flex pr-2 float-right">
                                    <button onClick={e => (
                                        dispatch({type: constants.INCREASE_ORDER_WIDGET, widgetOrder: widget.widgetOrder})
                                    )} disabled={(widget.widgetOrder == widgetLength)} className="btn btn-warning"><i
                                        className="fa fa-arrow-down"></i></button>
                                </div>


                                <div className="d-inline-flex pr-2 float-right">
                                    <button onClick={e => (
                                        dispatch({type: constants.DECREASE_ORDER_WIDGET, widgetOrder: widget.widgetOrder})
                                    )} disabled={(widget.widgetOrder == 1)} className="btn btn-warning"><i
                                        className="fa fa-arrow-up"></i></button>
                                </div>


                                <div className="d-inline-flex pr-1 float-right my-auto" style={widgetListStyle}>
                                    <select value={widget.widgetType}
                                            onChange={e =>
                                                dispatch({
                                                    type: 'SELECT_WIDGET_TYPE',
                                                    id: widget.id,
                                                    widgetType: selectElement.value
                                                })} ref={node => selectElement = node}>
                                        <option>Heading</option>
                                        <option>Paragraph</option>
                                        <option>List</option>
                                        <option>Image</option>
                                        <option>Link</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div>
            {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
            {widget.widgetType === 'Paragraph' && <ParaContainer widget={widget}/>}
            {widget.widgetType === 'List' && <ListContainer widget={widget}/>}
            {widget.widgetType === 'Image' && <ImageContainer widget={widget}/>}
            {widget.widgetType === 'Link' && <LinkContainer widget={widget}/>}
            </div>
        </div>

    )
}
const WidgetContainer = connect(state => ({
    preview: state.preview
}))(Widget)
export default WidgetContainer

var widgetListStyle =
    {
        height: "37px" , borderRadius : "3px"
    }

var widgetContainerStyle =
    {
        border: "solid" , borderWidth: "thin" , width:"auto", borderColor: "gray" , borderRadius: "3px"
    }