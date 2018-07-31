import * as constants from "../constants/index"


export const paraTextChanged = (dispatch,widgetId,newText) =>(
    dispatch({
        type : constants.PARAGRAPH_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
)

export const paraNameChanged = (dispatch,widgetId,newName) =>(
    dispatch({
        type : constants.PARAGRAPH_NAME_CHANGED,
        id: widgetId,
        name: newName
    })
)
