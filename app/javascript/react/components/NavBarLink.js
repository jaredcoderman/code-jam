import React from "react"
import { Link } from "react-router-dom"


const NavBarLink = props => {
  const shouldSendHttp = props.shouldSendHttp
  const href = props.href
  const displayText = props.displayText

  if(shouldSendHttp) {
    return (
      <li>
        <a href={`${href}`}>{displayText}</a>
      </li>
    )
  } else {
    return (
      <li>
        <Link to={`${href}`}>{displayText}</Link>
      </li>
    )
  }
}

export default NavBarLink