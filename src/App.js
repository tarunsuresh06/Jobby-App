import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import notFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <Route exact path="/not-found" component={notFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
