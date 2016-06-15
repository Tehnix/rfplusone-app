import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { Scene, Router, Modal } from 'react-native-router-flux'

import Launch from './Launch'
import Login from './Login'
import ConcertList from './ConcertList'
import ConcertView from './ConcertView'

import { FB_LOGIN_STATE } from '../actions/FBLogin'

const RouterWithRedux = connect()(Router)

class Routing extends Component {

  render() {
    return (
      <RouterWithRedux>
        <Scene key="root">
          <Scene key="Launch" component={Launch} initial={true}/>
          <Scene key="concertList"
                 component={ConcertList}
                 title="Concerts"
                 hideBackImage={true}
                 rightTitle="Chat"
                 onRight={()=>alert('Right button!')}/>
          <Scene key="concertView"
                 component={ConcertView}
                 title="Concerts View"
                 rightTitle="Chat"
                 onRight={()=>alert('Right button!')}/>
          <Scene key="chatList" component={ConcertView} title="Chats"/>
          <Scene key="login" direction="vertical">
            <Scene key="facebookLogin"
                   component={Login}
                   title="Facebook Login"
                   hideNavBar={true}
                   schema="modal"/>
            </Scene>
        </Scene>
      </RouterWithRedux>
    )
  }
}

module.exports = Routing
