import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import ProductAdd from './ProductAdd'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/logout' component={()=>{
          localStorage.removeItem('bazaar_token');
       return <Redirect to='/login'/>}}/>
      <Route exact path='/createproduct' component={ProductAdd}/>
    </Switch>
  </main>
)

export default Main
