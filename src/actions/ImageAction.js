import * as constants from "../constants/index"


export const imageTextChanged = (dispatch,widgetId,imageText) =>(
    dispatch({
        type : constants.IMAGE_TEXT_CHANGED,
        id: widgetId,
        text: imageText
    })
)

export const imageNameChanged = (dispatch,widgetId,imageName) =>(
    dispatch({
        type : constants.IMAGE_NAME_CHANGED,
        id: widgetId,
        name: imageName
    })
)