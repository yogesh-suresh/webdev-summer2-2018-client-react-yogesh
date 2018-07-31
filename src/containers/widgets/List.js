import React from  'react'

const List = ({widget, preview, listTextChanged, listTypeChanged, listNameChanged}) =>{
    let selectElem2
    let inputElem2
    let nameElem
    return(
        <div>
        <div className="container widget-container"
             style={widgetContainerStyle}>
            <div className="col-md-12">
                <div hidden={preview}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
    <textarea onChange={() => listTextChanged(widget.id, inputElem2.value)}
              ref={node2 => inputElem2= node2}
              value={widget.text}  className="form-control"/> <br/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">

                                <select onChange={() => listTypeChanged(widget.id, selectElem2.value)}
                                        ref={node2 => selectElem2=node2}
                                        value={widget.listType} className="form-control">
                                    <option value="1">Ordered List</option>
                                    <option value="2">Unordered List</option>
                                </select> <br/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">

                                <input onChange={() => listNameChanged(widget.id, nameElem.value)}
                                       value={widget.name}
                                       ref={node => nameElem = node} className="form-control"/> <br/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">

                                <h5> Preview</h5>
                            </div></div></div></div>
                <div className="row">
                    <div className="col-md-12">
                        {widget.listType== 1 && <div>{textToOrderedList(widget.text)} </div>}
                        {widget.listType== 2 && <div> {textToUnorderedList(widget.text)}</div>}
                    </div></div>
            </div></div>
        </div>
    )
}

const textToOrderedList = (text) =>
{
    let stringArray = text.split("\n");
    return (

        <ol className="list-group" >
            {stringArray.map(line => ( <li> {line} </li>))}
        </ol>
    )
}

const textToUnorderedList = (text) =>
{
    let stringArray = text.split("\n");
    return (

        <ul className="list-group" >
            {stringArray.map(line => ( <li> {line} </li>))}
        </ul>
    )
}

var widgetContainerStyle =
    {
        border: "solid" , borderWidth: "thin" , width:"auto", borderColor: "gray" , borderRadius: "3px"
    }

export default List;