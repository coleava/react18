import React from 'react'
import Konva from 'konva'

export default class Page1 extends React.Component {
constructor(props){
    super(props)
    this.state = {
        points:[]
    }
}
  componentDidMount() {
    const stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight,
      //   draggable: true,
    })
    const layer = new Konva.Layer()

    stage.add(layer)

    // layer.add(new Konva.Text({ text: 'try to drag a green source into any red target', padding: 10 }))

    const source = new Konva.Circle({
      x: 20,

      y: 50,

      radius: 10,

      fill: 'green',
    })

    layer.add(source)

    const target1 = new Konva.Circle({
      x: 20,

      y: 220,

      radius: 10,

      fill: 'red',

      name: 'target',
    })


    layer.add(target1)

    // let drawingLine = false

    let line

    source.on('mousedown', () => {
        // drawingLine = true
        const pos = stage.getPointerPosition()
        line = new Konva.Line({
          stroke: 'black',
          // remove line from hit graph, so we can check intersections
          listening: false,
        //   opacity: 1,
          points: [source.x(), source.y(), pos.x, pos.y],
        })
        layer.add(line)
    })

    stage.on('mouseover', (e) => {
      // stage.setDraggable(false)
      if (e.target.hasName('target')) {
        e.target.stroke('pink')

        layer.draw()
      }
    })

    stage.on('mouseout', (e) => {
      if (e.target.hasName('target')) {
        e.target.stroke(null)

        layer.draw()
      }
    })

    stage.on('mousemove', (e) => {
      if (!line) {
        return
      }

      const pos = stage.getPointerPosition()

      const points = line.points().slice()

      points[2] = pos.x

      points[3] = pos.y

      line.points(points)
      console.log('layer',layer);
      layer.batchDraw()

    })

    stage.on('mouseup', (e) => {
      if (!line) {
        return
      }

       console.log('target',e.target.target);
      if (!e.target.hasName('target')) {
        line.destroy()

        layer.draw()

        line = null
      } else {
        // let pos = e.target.getClientRect()

        // console.log('pos',pos);

        // const points = line.points().slice()

        // points[2] = pos.x + e.target.width() / 2

        // points[3] = pos.y + e.target.height() / 2
        const pos = stage.getPointerPosition()

        const points = line.points().slice()
  
        points[2] = pos.x
  
        points[3] = pos.y

        line.points(points)

        layer.batchDraw()

        line = null

        this.setState({
            points
        })
      }
    })

    document.getElementById('container').addEventListener('mouseover', (e) => {
      // console.log(e);
      // e.target.style.cursor = 'crosshair'
      e.target.style.cursor = 'pointer'
      // stage.setDraggable(true)
    })

    // layer.draw()
  }

   drawLine = (target) => {

   }

  render() {
    return <div id="container"></div>
  }
}
