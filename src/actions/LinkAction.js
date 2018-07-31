import * as constants from "../constants/index"

export const linkTextChanged = (dispatch,widgetId,linkText) =>(
    dispatch({
        type : constants.LINK_TEXT_CHANGED,
        id: widgetId,
        text: linkText
    })
)

export const linkDispChanged = (dispatch,widgetId,linkDispText) =>(
    dispatch({
        type : constants.LINK_DISP_CHANGED,
        id: widgetId,
        linkName: linkDispText
    })
)

export const linkNameChanged = (dispatch,widgetId,linkName) =>(
    dispatch({
        type : constants.LINK_NAME_CHANGED,
        id: widgetId,
        name: linkName
    })
)