import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import { lightColors } from './configs/colors'

class ReactCoursePlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: {
        primary: '#3AAFA9',
        lighter: '#DEF2F1',
        accent: '#17252A',
        background: '#CCC'
      }
    }
  }

  render() {
    if (this.props.source) {

      const { source } = this.props

      return (
        <div className={styles['react-course-player']}>
          <div className={styles['react-course-player__header']} style={{background: this.state.colors.accent}}>
            header {source.title}
          </div>
          <div className={styles['react-course-player__body']} style={{background: this.state.colors.background}}>
            <div className={styles['react-course-player__video-wrapper']} style={{background: '#000'}}>
              <video src='' controls />
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
