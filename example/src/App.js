import React, { Component } from 'react'

import ReactCoursePlayer from 'react-course-player'

export default class App extends Component {

  state = {
    source: null
  }

  componentDidMount() {
    fetch('course/course.json')
    .then(res => res.json())
    .then(res => this.setState({source: res}))
  }

  render () {
    return (
        <ReactCoursePlayer
          source={this.state.source}
        />
    )
  }
}
