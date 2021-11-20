import React from "react"
import _ from "lodash"
import NavBarLink from "./NavBarLink"

const SessionLinks = props => {
  const {user} = props
  if (_.isEmpty(user)) {
    return (
      <>
        <NavBarLink 
          shouldSendHttp={true}
          displayText="LOGIN"
          href="/login"
        />
        <NavBarLink 
          shouldSendHttp={true}
          displayText="SIGN UP"
          href="/signup"
        />
      </>
    )
  } else {
    return <NavBarLink 
            shouldSendHttp={true}
            displayText="LOGOUT"
            href="/logout"
           />
  }
}

export default SessionLinks