import React from  'react'

const Image = ({widget, preview, imageTextChanged, imageNameChanged}) => {
    let inputElem3
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
                                <input onChange={() => imageTextChanged(widget.id, inputElem3.value)}
                                       ref={node3 => inputElem3= node3}
                                       value={widget.text} className="form-control"
                                /> <br/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input onChange={() => imageNameChanged(widget.id, nameElem.value)}
                                       value={widget.name}
                                       ref={node => nameElem = node} className="form-control"/> <br/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">

                                <h4>Image Preview</h4>
                            </div></div></div>   </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="col-md-2">
                                <img src={widget.text} alt={widget.text} />
                                {/*<iframe width="auto"*/}
                                        {/*height="315"*/}
                                        {/*src={`https://www.youtube.com/embed/${widget.text}`}*/}
                                        {/*frameBorder="0"*/}
                                        {/*allow="autoplay; encrypted-media"*/}
                                        {/*allowFullScreen></iframe>*/}
                            </div>
                        </div></div></div></div></div>
        </div>

    )
}

var widgetContainerStyle =
    {
        border: "solid" , borderWidth: "thin" , width:"auto", borderColor: "gray" , borderRadius: "3px"
    }

    export default Image;