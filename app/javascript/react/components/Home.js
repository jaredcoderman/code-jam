import React from "react"

const Home = () => {
  return(
    <div className="grid-container">
      <h1 className="text-center">COME TOGETHER TO CODE</h1>
      <h4 className="text-center">CodeJam connects talented coders from all around the globe. </h4>
      <div className="grid-x grid-margin-x">
        <div className="cell small-12 text-center">
          <a href="/login" className="button">LOGIN</a>
        </div>
        <div className="cell small-12 text-center">
          <a href="/signup" className="button">SIGN UP</a>
        </div>
        <div className="cell small-12 text-center">
          <a href="/logout" className="button">LOGOUT</a>
        </div>  
      </div>
    </div>
  )
}

export default Home 