import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import 'reactjs-popup/dist/index.css'

const AddStoryModal = props => {
  const addYourStory = async () => {
    const {addNewYourStory} = props
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-stories'
    const storyDetails = {
      story_image:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/stories/instagram-mini-project-story-1-img.png',
      caption: 'test story',
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(storyDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      addNewYourStory(data.my_story)
    }
  }

  return (
    <Popup
      trigger={
        <div className="react-slick-item">
          <img
            className="poster"
            src="./img/sampleProfileImage.svg"
            width="100%"
            height="100%"
            alt="poster"
          />
          <p className="story-username">Your story</p>
        </div>
      }
      modal
    >
      <div>
        <button type="button" onClick={addYourStory}>
          Add Story
        </button>
      </div>
    </Popup>
  )
}

export default AddStoryModal
