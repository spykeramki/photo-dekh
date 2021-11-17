import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import UserStoriesSlick from '../UserStoriesSlick'
import FriendPost from '../FriendPost'

import './index.css'

const loadingStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {friendPostsList: [], search: '', isLoading: true}

  componentDidMount() {
    this.getFriendsPostsList()
  }

  getFriendsPostsList = async () => {
    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-posts?search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({isLoading: true})
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
      this.setState({friendPostsList: updatedData, isLoading: false})
    }
  }

  renderStories = () => (
    <div className="stories-container">
      <UserStoriesSlick />
    </div>
  )

  renderAddedComment = (commentDetails, postId) => {
    this.setState(prevState => ({
      friendPostsList: prevState.friendPostsList.map(eachItem => {
        if (eachItem.postId === postId) {
          return {
            ...eachItem,
            comments: [...eachItem.comments, commentDetails],
            commentsCount: eachItem.commentsCount + 1,
          }
        }
        return eachItem
      }),
    }))
  }

  renderFriendPosts = () => {
    const {friendPostsList, search} = this.state
    if (friendPostsList.length === 0 && search !== '') {
      return (
        <>
          <img src="./img/noSearch.svg" alt="search not found" />
          <h1>Search Not Found</h1>
          <p>Try different keyword or search again</p>
        </>
      )
    }
    return (
      <ul>
        {friendPostsList.map(eachItem => (
          <FriendPost
            friendPostDetails={eachItem}
            renderAddedComment={this.renderAddedComment}
            key={eachItem.postId}
          />
        ))}
      </ul>
    )
  }

  changeSearchInput = search => {
    this.setState({search}, this.getFriendsPostsList)
  }

  render() {
    const {search, isLoading} = this.state
    return (
      <>
        <Header changeSearchInput={this.changeSearchInput} search={search} />

        {isLoading ? (
          <div>
            {search === '' ? (
              <>
                <div testid="postListLoader">
                  <Loader type="ThreeDots" color="blue" />
                </div>
                <div testid="userStoriesLoader">
                  <Loader type="ThreeDots" color="blue" />
                </div>
              </>
            ) : (
              <div testid="searchPostsLoader">
                <Loader type="ThreeDots" color="blue" />
              </div>
            )}
          </div>
        ) : (
          <div className="home-bg-container">
            {search === '' ? this.renderStories() : <h1>Search Results</h1>}
            {this.renderFriendPosts()}
          </div>
        )}
      </>
    )
  }
}

export default HomeRoute
