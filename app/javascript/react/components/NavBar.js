import React, { useEffect, useState } from "react"
import { Route, Link } from "react-router-dom"
import Home from "./Home"
import NavBarLink from "./NavBarLink"
import _ from "lodash"
import UserProjectIndex from "./UserProjectIndex"
import ProjectForm from "./ProjectForm"
import ProjectEditForm from "./ProjectEditForm"
import ProjectShow from "./ProjectShow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode } from "@fortawesome/free-solid-svg-icons"
import SessionLinks from "./SessionLinks"
import fetchUser from "../../apiClient/fetchUser"

const NavBar = () => {

  const [user, setUser] = useState({})
  
  useEffect(() => {
    fetchUser().then(user => {
      setUser(user)
    })
  }, [])

  return(
    <div>
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li className="menu-text"><Link to="/">CodeJam <FontAwesomeIcon icon={faCode}/></Link></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <NavBarLink 
                shouldSendHttp={true} 
                displayText="FIND"
                href="/projects" 
              />
              <NavBarLink 
                shouldSendHttp={false} 
                displayText="HOST" 
                href="/host" 
              />
              <NavBarLink 
                shouldSendHttp={false} 
                displayText="MY PROJECTS" 
                href="/my_projects" 
              />
              <SessionLinks user={user} />
            </ul>
          </div>
        </div>
      </div>

      <Route exact path="/" component={Home} />
      <Route exact path="/my_projects" component={UserProjectIndex} />
      <Route exact path="/host" component={ProjectForm} />
      <Route exact path="/projects/:id/edit" component={ProjectEditForm} />
      <Route exact path="/projects/:id" component={ProjectShow} />
    </div>
  )
}

export default NavBar