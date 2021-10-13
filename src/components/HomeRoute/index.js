import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserStoriesSlick from '../UserStoriesSlick'
import FriendPost from '../FriendPost'
import './index.css'

const initialPostsList = [
  {
    postId: 'f25d77f0-602e-41d1-971e-4b8cf54709eb',
    userId: 'Varun_Aadithya',
    userName: 'Varun Aadithya',
    profilePic:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png',
    postDetails: {
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-1-img.png',
      caption: 'Another day, another sunrise',
    },
    commentsCount: 2,
    likesCount: 7,
    comments: [
      {
        userName: 'Prabuddha Dasgupta',
        userId: 'Prabuddha_Dasgupta',
        comment: 'Lightning is incredible.',
      },
      {
        userName: 'buddha gupta',
        userId: 'buddha_Dgupta',
        comment: 'incredible.',
      },
    ],
    createdAt: '4 Hours Ago',
  },
]

class HomeRoute extends Component {
  state = {friendPostsList: initialPostsList, search: ''}

  componentDidMount() {
    this.getFriendsPostsList()
  }

  getFriendsPostsList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.posts.map(eachItem => ({
        postId: eachItem.post_id,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        profilePic: eachItem.profile_pic,
        postDetails: {
          imageUrl: eachItem.post_details.image_url,
          caption: eachItem.post_details.caption,
        },
        commentsCount: eachItem.comments_count,
        likesCount: eachItem.likes_count,
        createdAt: eachItem.created_at,
        isLiked: false,
        comments: eachItem.comments.map(comment => ({
          comment: comment.comment,
          userId: comment.user_id,
          userName: comment.user_name,
        })),
      }))
      this.setState({friendPostsList: updatedData})
    }
  }

  renderStories = () => (
    <div className="stories-container">
      <UserStoriesSlick />
    </div>
  )

  renderFriendPosts = () => {
    const {friendPostsList, search} = this.state
    const updatedList = friendPostsList.filter(eachItem =>
      eachItem.postDetails.caption.toLowerCase().includes(search.toLowerCase()),
    )
    return (
      <ul>
        {updatedList.map(eachItem => (
          <FriendPost friendPostDetails={eachItem} key={eachItem.postId} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <>
        <Header />

        <div className="home-bg-container">
          {this.renderStories()}

          {this.renderFriendPosts()}
        </div>
      </>
    )
  }
}

export default HomeRoute
