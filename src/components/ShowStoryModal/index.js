import Popup from 'reactjs-popup'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoMdClose} from 'react-icons/io'

import 'reactjs-popup/dist/index.css'

class ShowStoryModal extends Component {
  state = {story: {}, status: 'loading'}

  componentDidMount() {
    this.getStoryDetails()
  }

  getStoryDetails = async () => {
    const {storyAuthor} = this.props
    const {userId} = storyAuthor
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-stories/${userId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        userId: data.story.user_id,
        userName: data.story.user_name,
        profilePic: data.story.profile_pic,
        storyDetails: {
          caption: data.story.story_details.caption,
          imageUrl: data.story.story_details.image_url,
        },
      }
      this.setState({
        story: updatedData,
        status: 'success',
      })
    } else {
      this.setState({status: 'failure'})
    }
  }

  render() {
    const {storyAuthor} = this.props
    const {userId, profilePic, userName} = storyAuthor
    const {story, status} = this.state
    const {storyDetails} = story
    return (
      <Popup
        trigger={
          <div className="react-slick-item" key={userId}>
            <img
              className="poster"
              src={profilePic}
              width="100%"
              height="100%"
              alt="poster"
            />
            <p className="story-username">{userName}</p>
          </div>
        }
        modal
      >
        {close => (
          <div data-testid="userStoryModal">
            {status === 'loading' ? (
              ''
            ) : (
              <div>
                <IoMdClose onClick={close} />
                <h1>Stories</h1>
                <img
                  className="poster"
                  src={profilePic}
                  width="100%"
                  height="100%"
                  alt="user story profile pic"
                />
                <p className="story-username">{userName}</p>
                <img src={storyDetails.imageUrl} alt="user story pic" />
                <p className="story-username">{storyDetails.caption}</p>
              </div>
            )}
            );
          </div>
        )}
      </Popup>
    )
  }
}
export default ShowStoryModal
