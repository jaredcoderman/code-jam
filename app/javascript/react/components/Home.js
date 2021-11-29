import React, { useEffect, useState } from "react"
import fetchUser from "../../apiClient/fetchUser"
import _ from "lodash"
import { Redirect } from "react-router"

const Home = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetchUser().then(user => {
      setUser(user)
    })
  }, [])

  if(!_.isEmpty(user)) {
    return <Redirect to="/pick_tags" />
  }

  return(
    <div className="text-center">
      <div className="grid-container">
        <h1 className="text-center home-title">COME TOGETHER TO CODE</h1>
        <h4 className="text-center home-flavor-text">CodeJam connects talented coders from all around the globe. </h4>
        <a href="/signup" className="home-get-started">GET STARTED</a>
      </div>
    </div>
  )
}

export default Home 