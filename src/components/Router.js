import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Navigator,
} from 'react-native'
import { connect } from 'react-redux'
import { Scene, Router, Modal, Actions } from 'react-native-router-flux'

import Login from './Login'
import ConcertList from './ConcertList'
import ConcertView from './ConcertView'
import ChatList from './ChatList'
import ChatView from './ChatView'

import { FB_LOGIN_STATE } from '../actions/FBLogin'

const RouterWithRedux = connect()(Router)

class Routing extends Component {

  render() {
    return (
      <RouterWithRedux>
        <Scene key="root"
               navigationBarStyle={styles.navigationBar}
               backButtonImage={require('../../graphics/backButtonWhite.png')}
               titleStyle={styles.navigationTitle}>
          <Scene key="concertList"
                 component={ConcertList}
                 title="Concerts"
                 hideBackImage={true}
                 rightButtonImage={require('../../graphics/chatIcon.png')}
                 rightButtonIconStyle={styles.chatIcon}
                 onRight={()=>{
                   Actions.chatList()
                 }}
                 initial={true}/>
          <Scene key="concertView"
                 component={ConcertView}
                 title="Concerts View"
                 rightButtonImage={require('../../graphics/chatIcon.png')}
                 rightButtonIconStyle={styles.chatIcon}
                 onRight={()=>{
                   Actions.chatList()
                 }}/>
          <Scene key="chatList" component={ChatList} title="Chats"/>
          <Scene key="chatView" component={ChatView} title="Chat"/>
          <Scene key="login"
                 component={Login}
                 title="Facebook Login"
                 hideNavBar={true}
                 schema="modal"
                 direction="vertical"/>
        </Scene>
      </RouterWithRedux>
    )
  }
}

module.exports = Routing

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: '#262626',
    borderBottomWidth: 0,
  },
  navigationTitle: {
    color: 'white',
  },
  chatIcon: {
    width: 20,
    height: 20,
  },
  backButton: {
    color: 'white',
  },
})
