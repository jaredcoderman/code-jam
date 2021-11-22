import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from "./Home"
import ProjectForm from './ProjectForm'
import UserProjectIndex from './UserProjectIndex'
import ProjectEditForm from './ProjectEditForm'
import ProjectShow from './ProjectShow'

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/my_projects" component={UserProjectIndex} />
        <Route exact path="/host" component={ProjectForm} />
        <Route exact path="/projects/:id/edit" component={ProjectEditForm} />
        <Route exact path="/projects/:id" component={ProjectShow} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
