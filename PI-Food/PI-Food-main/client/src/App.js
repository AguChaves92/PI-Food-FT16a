import './App.css';
import Landing from './components/landing/landing.jsx'
import { Route, Switch } from "react-router";
import Home from './components/Home/index'

function App() {
  return (
    <>
    <Switch>

    <div className="App">
     
    <div>
    <Route exact path="/" component={Landing}/>
    <Route path ="/home" component= {Home} />

    </div>
    </div>
    </Switch>
    </>
  );
}

export default App;
