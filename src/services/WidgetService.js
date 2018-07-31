// Ref from Prof repo
import * as constants from "../constants";

let _singleton = Symbol();
const widgetUrl=
    'https://safe-falls-17862.herokuapp.com/api/topic/TID/widget';


class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new WidgetService(_singleton);
        return this[_singleton]
    }


    FindAllWidgetsForTopic = (topicId) => {
        return fetch(widgetUrl.replace('TID', topicId))
            .then(response => (response.json()))
            // .then(widgets => dispatch({
            //     type: constants.FIND_ALL_WIDGETS_FOR_TOPIC,
            //     widgets: widgets }))
    }


    // createCourse(course) {
    //     return fetch(COURSE_API_URL, {
    //         body: JSON.stringify(course),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         method: 'POST'
    //     }).then(function (response) {
    //         return response.json();
    //     })}
    //
    //
    //
    //
    // deleteCourse(courseId) {
    //     return fetch(COURSE_API_URL, {
    //         body: JSON.stringify(courseId),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         method: 'DELETE'
    //     });
    //
    // }


}
export default WidgetService;