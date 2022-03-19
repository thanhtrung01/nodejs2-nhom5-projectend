import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import Home from './page/Home'
import FoodId from './page/FoodId'
import Create from './page/Create'

function App() {

  const [pageId, setPageId]  = useState(0);
  const [isLoading, setIsLoading]= useState(false);

  const handleChangeLoading = (value)=>{
    setIsLoading(value);
  }
  const handleChangePageId = (value)=>{
    setPageId(value);
  }
  return (
    <Router>
      {isLoading ? 
        <div className ="loading">
          <div className="ring"></div>
        </div> 
        :<></>
      }
      <ToastContainer />
      <div>
        <nav>
          <ul>
            <li>
              <Link 
                to="/" 
                className="link"
                onClick={()=> setPageId(0)}
                style={{ 
                  color: pageId === 0
                  ? "white"
                  : "#333"
                }}
              >Home</Link>
            </li>

            <li>
              <Link
                to="/create"
                className="link"
                onClick={()=> setPageId(1)}
                style={{ 
                  color: pageId === 1
                  ? "white"
                  : "#333"
                }}
                >Create</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/foodId/:_id">
            <FoodId
              pageId={pageId}
              handleChangeLoading={handleChangeLoading}
              handleChangePageId={handleChangePageId}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/create">
            <Create 
              pageId={pageId} 
              handleChangeLoading={handleChangeLoading}
              handleChangePageId={handleChangePageId}
            />
          </Route>
          <Route path="/">
            <Home 
              pageId={pageId} 
              handleChangeLoading={handleChangeLoading}
              handleChangePageId={handleChangePageId}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
