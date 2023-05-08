import React from 'react'
import Konva from 'konva'
import deskPng from '../assets/desk.png'

export default class Page2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.drawingLine = true
    this.line = null
    this.stage = null
    this.layer = null
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    this.stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight,
      draggable: true,
    })
    this.layer = new Konva.Layer()
    this.stage.add(this.layer)

    this.initBackground()

    this.stage.on('mousedown', (e) => {
      this.line = new Konva.Line({
        stroke: 'black',
        points: [],
        opacity: 1,
        listening: false,
        closed: true,
      })

      const pos = this.stage.getPointerPosition()
      this.line.points([pos.x, pos.y, pos.x, pos.y])
      this.layer.add(this.line)
    })

    this.stage.on('mouseover', (e) => {
      if (e.target.hasName('target')) {
        e.target.stroke('pink')

        this.state.layer.draw()
      }
    })

    this.stage.on('mouseout', (e) => {
      if (e.target.hasName('target')) {
        e.target.stroke(null)

        this.layer.draw()
      }
    })

    this.stage.on('mousemove', (e) => {
      if (!this.line) {
        return
      }

      const pos = this.stage.getPointerPosition()
      let points = this.line.points().slice()
      points[2] = pos.x
      points[3] = pos.y
      this.line.points(points)
      this.layer.batchDraw()
    })

    this.stage.on('mouseup', (e) => {
      if (!this.line) {
        return
      }

      const pos = this.stage.getPointerPosition()

      let points = this.line.points().slice()

      points[2] = pos.x

      points[3] = pos.y

      this.line.points(points)
      this.line.closed(true)
      this.line.fill('#00D2FF')
      //   this.line.fi
      console.log(this.layer)
      this.layer.batchDraw()

      this.line = null
    })
  }

  initBackground = () => {
    let imageObj = new Image()
    imageObj.src = deskPng
    imageObj.onload = () => {
      console.log(11111)
      let image = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: 1000,
        height: 900,
      })
      image.on('mousedown', () => {
        this.stage.draggable(false)
      })
      image.on('mousedown', () => {
        this.stage.draggable(true)
      })
      // add the shape to the layer
      this.layer.add(image)
    }
  }

  render() {
    return <div id="container"></div>
  }
}
