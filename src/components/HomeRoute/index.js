import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserStoriesSlick from '../UserStoriesSlick'
import FriendPost from '../FriendPost'
import './index.css'

class HomeRoute extends Component {
  state = {friendPostsList: [], search: ''}

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

        {/* <div className="home-bg-container">
          {this.renderStories()}

          {this.renderFriendPosts()}
        </div> */}
      </>
    )
  }
}

export default HomeRoute
