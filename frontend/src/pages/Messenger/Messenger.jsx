import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import Conversation from '../../components/Conversations/Conversation';
import Message from '../../components/Message/Message';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import {MenuIcon, SchoolIcon} from '@mui/icons-material/Menu'
import './Messenger.scss'

  const drawerWidth = 300


  const Messenger = (props) => {
    console.log('here');
    const { window, setCircle } = props


    const history = useHistory()
    const { userID } = useParams()
    const [user, setUser] = useState({})

    const accessToken = localStorage.getItem('accessToken')
    useEffect(() => {
      setCircle(true)
      if (accessToken) {

        const fetchData = async () => {

          try {
              const successUser = await axios.get(`/user/${userID}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            console.log('Success user', successUser)
            setUser(successUser.data)

            const successPost = await axios.get(`/post/find?user=${userID}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            console.log('Success post', successPost)
            setUser(successPost.data)
          } catch (error) {
            // console.log(error)
          }
        }
        fetchData()
      } else {
        console.log('Im here')
        history.push('/login', { text: 'hellooooooo' })
      }
      setCircle(false)
    }, [history, setCircle, userID, accessToken])


    return (
      <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
              <div>
                <Conversation />
              </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
              <div className="chatBoxTop">

                      <Message />

                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                  ></textarea>
                  <button className="chatSubmitButton">
                    Send
                  </button>
                </div>
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
      </>
      );
  }

  export default Messenger