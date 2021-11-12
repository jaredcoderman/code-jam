import React, { useEffect, useState } from "react"
import { Route, Link } from "react-router-dom"
import Home from "./Home"
import NavBarLink from "./NavBarLink"
import _ from "lodash"
import UserProjectIndex from "./UserProjectIndex"
import ProjectForm from "./ProjectForm"
import ProjectEditForm from "./ProjectEditForm"

const NavBar = () => {
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
                  shouldSendHttp={true} 
                  displayText="FIND"
                  href="/find" 
              />
              <NavBarLink 
                  shouldSendHttp={true} 
                  displayText="HOST" 
                  href="/host" 
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
      <Route exact path="/my_projects" component={UserProjectIndex} />
      <Route exact path="/host" component={ProjectForm} />
      <Route exact path="/projects/:id/edit" component={ProjectEditForm} />
    </div>
  )
}

export default NavBar