import * as constants from "../constants/index"


export const headingNameChanged = (dispatch, widgetId, newName) => (
    dispatch({
        type: constants.HEADING_NAME_CHANGED,
        id: widgetId,
        name: newName})
)

export const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText})
)
export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize})
)