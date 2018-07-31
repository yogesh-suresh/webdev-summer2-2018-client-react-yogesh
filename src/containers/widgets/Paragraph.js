import React from  'react'

const Paragraph = ({widget, preview, paraTextChanged, paraNameChanged}) => {
    let inputElem
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
        <textarea onChange={() => paraTextChanged(widget.id, inputElem.value)}
                  ref={node => inputElem= node}
                  value={widget.text} className="form-control">
    </textarea> <br/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input onChange={() => paraNameChanged(widget.id, nameElem.value)}
                                       value={widget.name}
                                       ref={node => nameElem = node} className="form-control"/> <br/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <h4>Paragraph Preview</h4>
                            </div></div></div></div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <p> {widget.text} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

var widgetContainerStyle =
    {
        border: "solid" , borderWidth: "thin" , width:"auto", borderColor: "gray" , borderRadius: "3px"
    }


export default Paragraph