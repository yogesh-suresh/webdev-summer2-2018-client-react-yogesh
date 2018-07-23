import React from "react";
import ModuleList from "./ModuleList"
import CourseCard from "../components/CourseCard"
import LessonTabs from './LessonTabs'
import TopicPills from '../components/TopicPills'
import CourseEditor from './CourseEditor'

class WhiteBoard extends React.Component{
    render(){
        return (
            <div className="container-fluid">
                <h1>White Board</h1>


                <CourseEditor/>
                <br/>
                {/*<LessonTabs/>*/}
                {/*<TopicPills />*/}
                {/*<ModuleList/>*/}

                {/*<div className="card-deck">*/}
                    {/*<CourseCard/>*/}
                    {/*<CourseCard/>*/}
                    {/*<CourseCard/>*/}
                    {/*<CourseCard/>*/}
                    {/*<CourseCard/>*/}
                {/*</div>*/}

            </div>
        )
    }
}

export default WhiteBoard;