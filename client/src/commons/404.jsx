import React from 'react'
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div>
      <p>Page not found</p>
      <Link to="/home">
      Back Home
      </Link>
    </div>
  )
}

export default Page404;