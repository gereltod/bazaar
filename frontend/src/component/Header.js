import React from 'react'
import { Link, withRouter } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
   
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        { !localStorage.getItem('bazaar_token') && <li><Link to='/login'>Login</Link></li>}
        { !!localStorage.getItem('bazaar_token') && <li><Link to='/logout'>Log out</Link></li>}
        <li><Link to='/create'>Create user</Link></li>
        { !!localStorage.getItem('bazaar_token') && <li><Link to='/createproduct'>Create product</Link></li>}
      </ul>
    </nav>
  </header>
)

export default withRouter(Header)