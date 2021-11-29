import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCheck, faUserMinus } from "@fortawesome/free-solid-svg-icons"

const RequestTile = props => {
  const { request, rejectRequest, acceptRequest } = props

  return(
    <div className="request-tile">
      <FontAwesomeIcon onClick={acceptRequest} className="request-accept" icon={faUserCheck} />   
      {request.name}
      <FontAwesomeIcon onClick={rejectRequest} className="request-deny" icon={faUserMinus} />
  </div>
  )
}

export default RequestTile