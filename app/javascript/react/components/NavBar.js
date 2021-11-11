import React, { useEffect, useState } from "react"
import { Route, Link } from "react-router-dom"
import FetchCurrentUser from "./FetchCurrentUser"
import Home from "./Home"
import NavBarLink from "./NavBarLink"
import _ from "lodash"

const NavBar = () => {

  // Logic to decide whether is a react link or erb link
  const [currentUser, setCurrentUser] = useState({})

  debugger
  return(
    <div>
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li className="menu-text">CodeJam</li>
                <NavBarLink 
                  shouldSendHttp={false} 
                  displayText="HOME" 
                  href="/" 
                />
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <NavBarLink 
                  shouldSendHttp={false} 
                  displayText="FIND" 
                  href="/find" 
              />
              <NavBarLink 
                  shouldSendHttp={false} 
                  displayText="CREATE" 
                  href="/create" 
              />
              <NavBarLink 
                  shouldSendHttp={false} 
                  displayText="MY PROJECTS" 
                  href="/my_projects" 
              />
            </ul>
          </div>
        </div>
      </div>
      <Route exact path="/" component={Home} />
    </div>
  )
}

export default NavBar