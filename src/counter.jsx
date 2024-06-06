import React, {useState, useEffect} from 'react'
import './App.css'


function Counter() {
  let [count, setCount] = useState(1)
  let [userData, setUserData] = useState(null)
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState(null)

  useEffect(() => {
    let fetchUserData = async () => {
      setLoading(true)
      try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/users/${count}`)
        if (!response.ok) throw new Error ('Error Fetching Data');

        let userData = await response.json()
        setUserData(userData)
        setLoading(false)
        setError(null)
      } catch (error) {
        setError(<p>Error Fetching Data &nbsp;&nbsp;<i class="fa-solid fa-circle-exclamation"></i></p>  )
        setLoading(false)
      }
    }
    fetchUserData()
  }, [count])

  let increment = () => setCount(prevCount => prevCount + 1)
  let decrement = () => setCount(prevCount => prevCount > 1 ? prevCount - 1 : prevCount)


  return (
    <div className="counter-container">
        <h1>Counter</h1>
        <h3>{count}</h3>
        <div className="button-container">
          <button onClick={increment}>Increment</button> &nbsp; &nbsp; &nbsp;
          <button onClick={decrement}>Decrement</button>
        </div> <br /><br /> 
        <div>
          {loading && <i class="fa-solid fa-spinner"></i> }
          {error && <p className="error-message">{error}</p>}
          {userData && (
            <div className="user-info">
              <h2>User Information</h2>
              <p>Name : {userData.name}</p>
              <p>Email : {userData.email}</p>
              <p>Phone : {userData.phone}</p>
            </div>
          )}
        </div>
    </div>
  )
}

export default Counter