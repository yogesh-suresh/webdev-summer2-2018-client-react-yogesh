import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';

class CourseManager extends React.Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand" >WhiteBoard</Link>
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                     </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to="/courses" className="nav-link" href="#">Course <span className="sr-only">(current)</span></Link>
                            </li>
                            {/*<li className="nav-item">*/}
                                {/*<a className="nav-link" href="#">Features</a>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                     </nav>

                 <Route path="/courses"
                 component={CourseList}>
                 </Route>
                 <Route path="/course/:courseId"
                 component={CourseEditor}>
                 </Route>
                </div>
            </Router>
        )
    }
}
export default CourseManager;