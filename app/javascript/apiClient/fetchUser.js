const fetchUser = async () => {
  try {
    const response = await fetch("/api/v1/users/current")
    if(!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`)
    }
    const parsedResponse = await response.json()
    return parsedResponse.user
  } catch(err) {
    console.error(err.message)
  }
}

export default fetchUser