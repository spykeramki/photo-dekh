import Modal from 'react-modal'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoMdClose} from 'react-icons/io'
import './index.css'

class StoryModal extends Component {
  state = {story: {}, status: 'loading', isModalOpen: false}

  componentDidMount() {
    this.onModalOpen()
    this.getStoryDetails()
  }

  getStoryDetails = async () => {
    const {userId} = this.props
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

  onModalOpen = () => {
    this.setState({isModalOpen: true})
  }

  onClickClose = () => {
    const {onCloseModal} = this.props
    this.setState({isModalOpen: false})
    onCloseModal()
  }

  render() {
    const {story, status, isModalOpen} = this.state
    const {storyDetails, profilePic, userName} = story

    return (
      <Modal isOpen={isModalOpen} className="Modal" overlayClassName="Overlay">
        <div testid="userStoryModal">
          {status === 'loading' ? (
            ''
          ) : (
            <div>
              <IoMdClose onClick={this.onClickClose} />
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
        </div>
      </Modal>
    )
  }
}

export default StoryModal
