import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AlertProvider from './context/alert/AlertProvider'
import FirebaseProvider from './context/firebase/FirebaseProvider'

function App() {
  return (
    <FirebaseProvider>
      <AlertProvider>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path={'/'} component={HomePage} exact />
              <Route path={'/about'} component={AboutPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </AlertProvider>
    </FirebaseProvider>
  )
}

export default App
