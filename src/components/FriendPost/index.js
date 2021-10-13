import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {Link} from 'react-router-dom'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import LikesContext from '../../context'
import './index.css'

class FriendPost extends Component {
  state = {commentText: ''}

  changeComment = event => {
    this.setState({commentText: event.target.value})
  }

  addComment = async () => {
    const {friendPostDetails} = this.props
    const {postId} = friendPostDetails
    const {commentText} = this.state
    const url = `https://apis.ccbp.in/insta-posts/${postId}/comment`
    const jwtToken = Cookies.get('jwt_token')
    const postDetails = {
      comment_text: commentText,
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(postDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
    }
  }

  render() {
    const {friendPostDetails} = this.props
    const {
      postId,
      userId,
      userName,
      profilePic,
      postDetails,
      commentsCount,
      likesCount,
      comments,
      createdAt,
    } = friendPostDetails
    return (
      <LikesContext.Consumer>
        {value => {
          const {likesStatusList, changeLikeStatus} = value

          const isPostLiked = () => {
            const postObject = likesStatusList.find(
              eachItem => eachItem.id === postId,
            )
            if (postObject === undefined) {
              return false
            }
            return true
          }
          const isLiked = isPostLiked()
          const onClickLike = () => {
            if (isLiked) {
              changeLikeStatus(postId, false)
            } else {
              changeLikeStatus(postId, true)
            }
          }

          const renderProfileDetails = () => (
            <Link to={`/user/${userId}`}>
              <div className="friend-profile-container">
                <img
                  src={profilePic}
                  className="friend-profile-image"
                  alt="post author profile pic"
                />
                <p>{userName}</p>
              </div>
            </Link>
          )

          const renderUserActions = () => (
            <div className="user-actions-icons">
              <button type="button" onClick={onClickLike}>
                {isLiked ? (
                  <FcLike data-testid="unLikeIcon" />
                ) : (
                  <BsHeart data-testid="likeIcon" />
                )}
              </button>
              <FaRegComment data-testid="commentIcon" />
              <BiShareAlt data-testid="shareIcon" />
            </div>
          )

          const renderPostPopularity = () => (
            <div>
              <p>{likesCount} likes</p>
              <p>{postDetails.caption}</p>
              <p>View all {commentsCount} comments</p>
            </div>
          )

          const renderComments = () => (
            <ul>
              {comments.map(eachItem => (
                <li key={eachItem.userId}>
                  <p>{eachItem.userName}</p>
                  <p>{eachItem.comment}</p>
                </li>
              ))}
            </ul>
          )

          const renderAddCommentSection = () => (
            <div>
              <img
                src={profilePic}
                className="friend-profile-image"
                alt="my profile pic"
              />
              <input type="text" onChange={this.changeComment} />
              <button type="button" onClick={this.addComment}>
                Post
              </button>
            </div>
          )

          return (
            <li className="friend-post-bg-container">
              {renderProfileDetails()}
              <div className="post-container">
                <img
                  src={postDetails.imageUrl}
                  className="post-image"
                  alt="post pic"
                />
              </div>
              <div className="friend-post-content-container">
                {renderUserActions()}
                {renderPostPopularity()}
                {renderComments()}
                <p>{createdAt}</p>
              </div>
              {renderAddCommentSection()}
            </li>
          )
        }}
      </LikesContext.Consumer>
    )
  }
}

export default FriendPost
