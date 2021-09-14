import './App.css';
import Landing from './components/landing/landing.jsx'
import { Route, Switch } from "react-router";
import Home from './components/Home/index'
import AddRecipe from './components/AddRecipe/AddRecipe';
import Detail from './components/Detail/Detail'


function App() {
  return (
    <>

    <div className="App">
    <Switch>
     
    
    <Route exact path="/" component={Landing}/>
    <Route exact path ="/home" component= {Home} />
    <Route exact path = "/home/Add" component={AddRecipe}/>
    <Route exact path='/home/detail/:id' component={Detail} />
    

    
    </Switch>
    </div>
    </>
  );
}

export default App;
