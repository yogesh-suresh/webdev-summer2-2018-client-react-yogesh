import React from 'react';
import Hello from '../components/Hello';
import {BrowserRouter as Router, Link,Route}
    from 'react-router-dom'

const App = () => {
    return(

        <Router><div>
            <Link to="/hello">Hello</Link>
            <Route path='/hello'
                   component={Hello }/>
        </div></Router>
            );
};

export default App;