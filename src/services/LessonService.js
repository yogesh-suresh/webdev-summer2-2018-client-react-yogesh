let _singleton = Symbol();
const lessonCourseUrl =
    'https://safe-falls-17862.herokuapp.com/api/course/CID/module/MID/lesson';
const lessonUrl =
    'https://safe-falls-17862.herokuapp.com/api/lesson/LID';

export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }
    createLesson(courseId, moduleId, lesson) {
        return fetch(lessonCourseUrl.replace('CID', courseId).replace('MID', moduleId), {
            body: JSON.stringify(lesson),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        });
    }
    deleteLesson(lessonId) {
        return fetch(lessonUrl.replace('LID', lessonId), {
            method: 'DELETE'
        });
    }


    findAllLessonsForModule(courseId, moduleId) {
        return fetch(lessonCourseUrl.replace('CID', courseId).replace('MID', moduleId))
            .then(function (response) {
                if(response.status === 500) {
                    return null;
                } else {
                    return response.json();
                }
            });
    }

    findAllLessons() {
        return fetch(lessonUrl.replace('LID', ''))
            .then(function (response) {
                if(response.status === 500) {
                    return null;
                } else {
                    return response.json();
                }
            });
    }
}