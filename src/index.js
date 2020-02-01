import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import { lightColors } from './configs/colors'

class ReactCoursePlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSection: null,
      currentVideoPath: null,
      currentSearch: '',
      selectedSection: '',
      selectedVideo: '',
      colors: {
        primary: '#3AAFA9',
        lighter: '#DEF2F1',
        accent: '#17252A',
        background: '#FFFFFF',
        textPrimary: '#FFFFFF',
        textSecondary: '#444'
      }
    }
  }

  videoSelectionHandler(section, video) {
    const nextVideoPath = this.props.source.path + section.path + video.filename + '#t=0.9'
    this.setState({currentVideoPath: nextVideoPath, selectedVideo: video.title, selectedSection: section.section_title})
  }

  searchInputHandler(query) {
    this.setState({currentSearch: query})
  }

  isSectionMatchingSearch(videos) {
    const filteredVideos = videos.filter(video => this.isLessonMatchingSearch(video.title))
    return filteredVideos.length > 0
  }

  isLessonMatchingSearch(string) {
    return string.toLowerCase().includes(this.state.currentSearch.toLowerCase())
  }

  render() {
    if (this.props.source) {
      const { colors } = this.state
      const { source } = this.props
      const { sections } = source

      return (
        <div className={styles['react-course-player']}>
          <div className={styles['react-course-player__header']} style={{background: colors.accent, color: colors.textPrimary}}>
            <span>{source.title + ' / ' + this.state.selectedSection + ' / ' + this.state.selectedVideo}</span>
            <input type='text' style={{padding: '5px'}} value={this.state.currentSearch} onChange={(e) => this.searchInputHandler(e.target.value)} />

          </div>
          <div className={styles['react-course-player__body']} style={{background: this.state.colors.background}}>
            <div className={styles['react-course-player__video-wrapper']} style={{background: '#000'}}>
              <video src={this.state.currentVideoPath} preload='metadata' controls />
            </div>
            <div className={styles['react-course-player__menu']}>
              
              {
                sections.filter(section => this.isSectionMatchingSearch(section.videos)).map((section, sectionIndex) => (
                  <div className={styles['react-course-player__section']}>
                    <div className={styles['react-course-player__section-title']} style={{background: colors.primary, color: colors.textPrimary}}> {section.section_title} </div>
                    {
                      section.videos.filter(video => this.isLessonMatchingSearch(video.title)).map((video, videoIndex) => (

                        <div
                          className={`${styles['react-course-player__lesson']} ${this.state.selectedVideo === video.title ? styles['np'] : null}`}
                          style={{ background: videoIndex % 2 === 0 ? colors.background : colors.lighter, color: colors.textSecondary }}
                          onClick={() => this.videoSelectionHandler(section, video)}
                        >
                          {video.title}
                        </div>

                      ))
                    }
                  </div>
                ))
              }
            </div>

          </div>
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

ReactCoursePlayer.propTypes = {
  source: PropTypes.object
}

export default ReactCoursePlayer
