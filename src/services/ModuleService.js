let _singleton = Symbol();
const MODULE_API_URL =
    'https://safe-falls-17862.herokuapp.com/api/course/CID/module';
const MODULE_URL =
    'https://safe-falls-17862.herokuapp.com/api/module/MID';


export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }
    createModule(courseId, module) {
        return fetch(MODULE_API_URL.replace('CID', courseId), {
            body: JSON.stringify(module),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        });
    }
    findAllModulesForCourse(courseId) {
        return fetch(MODULE_API_URL.replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
    }

    findAllModules() {
        return fetch(MODULE_URL.replace('MID', ''))
            .then(function (response) {
                return response.json();
            })
    }
    deleteModule(courseId, moduleId) {
        return fetch(MODULE_API_URL.replace('CID', courseId) + "/" + moduleId, {
            method: 'DELETE'
        });
    }
}