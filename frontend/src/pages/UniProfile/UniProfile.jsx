import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SchoolIcon from '@mui/icons-material/School'
import Typography from '@mui/material/Typography'
import Navbar from '../../components/Navbar/Navbar'
import PostingBox from '../../components/PostingBox/PostingBox.jsx'
import Post from '../../components/Post/Post.jsx'
import Card from '../../components/Card/Card'
import { Avatar, Container, Grid, Hidden } from '@mui/material'

const drawerWidth = 200

const UniProfile = ({ setCircle }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const history = useHistory()
  const { uniId } = useParams()
  const [unis, setUnis] = useState([])
  const { uniID } = useParams()
  const [posts, setPosts] = useState([])
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    setCircle(true)
    if (accessToken) {
      const fetchData = async () => {
        try {
          const successStudy = await axios.get(`/uni/${uniID}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          console.log('here')
          setUnis(successStudy)
          console.log('Success Uni Stuff', successStudy.data)
        } catch (error) {
          console.log('Error fetching data', error)
        }
      }
      fetchData()
      console.log(unis)
    } else {
      console.log('Im here')
      history.push('/login', { text: 'hellooooooo' })
    }
    setCircle(false)
  }, [history, setCircle, setUnis, accessToken])

  // useEffect(() => {
  //   setCircle(true)
  //   if (accessToken) {
  //     const fetchData = async () => {
  //       try {
  //         // const successPost = await axios.get(`/post/find?user=${userID}`, {
  //         //   headers: {
  //         //     Authorization: `Bearer ${accessToken}`,
  //         //   },
  //         // })
  //         // console.log('Success post', successPost)
  //         const posts = [
  //           {
  //             _id: 1,
  //             text: 'This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. ',
  //             shares: 10,
  //             likes: 52,
  //           },
  //           {
  //             _id: 2,
  //             text: 'This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. ',
  //             shares: 10,
  //             likes: 52,
  //           },
  //         ]
  //         setPosts(posts)
  //       } catch (error) {
  //         console.log('Error while getting posts', error)
  //       }
  //     }
  //     fetchData()
  //   } else {
  //     console.log('Im here')
  //     history.push('/login', { text: 'hellooooooo' })
  //   }
  //   setCircle(false)
  // }, [history, setCircle, accessToken])

  const drawer = (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt='Memy Sharp'
          src='https://picsum.photos/400/400'
          sx={{ width: 100, height: 100, margin: '25px 0 15px 0' }}
        />
        {/* <div>
          {user.fName} {user.lName}
        </div>
        <div>{user.username}</div>
        <div>{user.isFrom}</div>
        <div>{user.role}</div> */}
      </Box>
      <br />
      <Divider />
      <List>
        {['A', 'B', 'C'].map((item) => {
          return item
        })}
        <ListItem button>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText
            primary={'University of Canberra'}
            secondary={'Expected completion 2021'}
            onClick={() => console.log('list item clicked')}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Frakfurt University'}
            secondary={'2015-2021'}
            onClick={() => console.log('list item clicked')}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Engineering Society Club'}
            secondary={'University of Canberra'}
            onClick={() => console.log('list item clicked')}
          />
        </ListItem>
      </List>
    </div>
  )

  return (
    <>
      <Navbar />
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              marginTop: '57px',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Container disableGutters maxWidth='xl' className='container'>
        <Grid container>
          <Hidden mdDown>
            <Grid item md={4}>
              <Card>{drawer}</Card>
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={4}>
              <Card height='190px'>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    alt='Memy Sharp'
                    src='https://picsum.photos/400/400'
                    sx={{ width: 100, height: 100, margin: '25px 0 15px 0' }}
                    onClick={handleDrawerToggle}
                  />
                  <div>{/* {user.fName} {user.lName} */}</div>
                </Box>
              </Card>
            </Grid>
          </Hidden>
          <Grid item xs={8}>
            <PostingBox />
            <Hidden mdDown>
              <Post posts={posts} />
            </Hidden>
          </Grid>
          <Hidden mdUp>
            <Post posts={posts} />
          </Hidden>
        </Grid>
      </Container>
    </>
  )
}

export default UniProfile
