import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ShowStoryModal from '../ShowStoryModal'
import AddStoryModal from '../AddStoryModal'
import YourStory from '../YourStory'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 8,
        infinite: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 7,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 6,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 5,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
  ],
}

class UserStoriesSlick extends Component {
  state = {stories: [], status: 'loading'}

  componentDidMount() {
    this.getStoriesList()
  }

  getStoriesList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.users_stories.map(eachItem => ({
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        profilePic: eachItem.profile_pic,
      }))
      let myStory
      if (data.my_story !== null) {
        myStory = {
          id: data.my_story.id,
          storyImage: data.my_story.story_image,
          caption: data.my_story.caption,
        }
      } else {
        myStory = null
      }
      myStory = data.my_story
      this.setState({
        stories: {storiesList: updatedData, myStory},
        status: 'success',
      })
    } else {
      this.setState({status: 'failure'})
    }
  }

  addNewYourStory = story => {
    const updatedStory = {
      id: story.id,
      storyImage: story.story_image,
      caption: story.caption,
    }
    this.setState(prevState => ({
      stories: {...prevState.stories, myStory: updatedStory},
    }))
  }

  renderSlider = () => {
    const {stories} = this.state
    const {storiesList, myStory} = stories
    return (
      <Slider {...settings}>
        {myStory !== null ? (
          <YourStory yourStory={myStory} key={myStory.id} />
        ) : (
          <AddStoryModal addNewYourStory={this.addNewYourStory} key="abcde" />
        )}

        {storiesList.map(story => (
          <ShowStoryModal storyAuthor={story} key={story.userId} />
        ))}
      </Slider>
    )
  }

  render() {
    const {status} = this.state
    return (
      <div className="slick-app-container">
        {status === 'loading' ? (
          ''
        ) : (
          <div style={{width: '80%'}}>{this.renderSlider()}</div>
        )}
      </div>
    )
  }
}

export default UserStoriesSlick
