import * as constants from "../constants/index"

export const listTextChanged = (dispatch,widgetId,newListText) =>(

    dispatch({
        type : constants.LIST_TEXT_CHANGED,
        id: widgetId,
        text: newListText

    })

)

export const listNameChanged = (dispatch,widgetId,newListName) =>(

    dispatch({
        type : constants.LIST_NAME_CHANGED,
        id: widgetId,
        name: newListName

    })

)

export const listTypeChanged = (dispatch,widgetId,listType) =>(
    dispatch({
        type : constants.LIST_TYPE_CHANGED,
        id: widgetId,
        listType: listType
    })
)