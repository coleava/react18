import React from 'react'
import Konva from 'konva'
import deskPng from '../assets/desk.png'

export default class Page3 extends React.Component {
  stage = null
  layer = null
  shape = null
  currentTool = 'poly'
  drawing = false //一开始不能绘画
  currentDrawingShape = null //现在绘画的图形
  pointStart = [] //记录鼠标按下的起始坐标
  polygonPoints = [] //存储绘画多边形各个顶点的数组
  componentDidMount() {
    this.init()
    this.initBackground()
    this.addListener()
  }

  init = () => {
    this.stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight,
      // draggable: true,
    })
    this.stage.container().style.cursor = 'crosshair'
    this.layer = new Konva.Layer()
    this.stage.add(this.layer)
  }

  initBackground = () => {
    let imageObj = new Image()
    imageObj.src = deskPng
    imageObj.onload = () => {
      this.shape = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: 1000,
        height: 900,
      })
      //   image.on('mousedown', () => {
      //     this.stage.draggable(false)
      //   })
      //   image.on('mousedown', () => {
      //     this.stage.draggable(true)
      //   })
      // add the shape to the layer
      this.layer.add(this.shape)
    }
  }

  addListener = () => {
    this.stage.on('mousedown', (e) => {
      //图形起始点只能在图片层上，移除变形框
      if (e.target === this.shape) {
        console.log(888)
        // 如果有，就移除舞台上唯一一个的变形框
        if (this.stage.find('Transformer').length != 0) {
          console.log(111)
          this.stage.find('Transformer')[0].destroy()
        }
        //如果不在绘画且舞台上的多边形被选中
        if (!this.drawing && this.stage.find('Circle').length != 0) {
          let circlePoints = this.stage.find('Circle')
          console.log(1131)
          for (let i = 0; i < circlePoints.length; i++) {
            if (circlePoints[i].visible()) {
              //隐藏顶点
              this.stage.find('Circle').forEach((element) => {
                element.hide()
              })
              return
            }
          }
        }
        this.layer.draw()
        //开始初始绘画
        this.stageMousedown(this.currentTool, e)
        return
      }
      //允许后续点绘画在其他图形上
      if (this.drawing) {
        console.log(999)
        this.stageMousedown(this.currentTool, e)
        return
      }
    })
    //鼠标移动
    this.stage.on('mousemove', (e) => {
      if (this.currentTool && this.drawing) {
        //绘画中
        this.stageMousemove(this.currentTool, e)
      }
    })
    //鼠标放开
    this.stage.on('mouseup', (e) => {
      this.stageMouseup(this.currentTool, e)
    })
  }

  drawCircle = (x, y) => {
    const circle = new Konva.Circle({
      name: 'circle',
      x: x,
      y: y,
      radius: 5,
      visible: true, //是否显示
      fill: '#ffffff',
      stroke: '#333333',
      draggable: false,
      strokeWidth: 0.5,
    })
    let xChange, yChange
    this.layer.add(circle)
    this.layer.draw()
    circle.on('dragstart', (e) => {
      let polyPoints = this.currentDrawingShape
        .getChildren((element) => {
          return element.getClassName() === 'Line'
        })[0]
        .points()
      //查找拖拽了多边形的哪个点
      for (let i = 0; i < polyPoints.length; i += 2) {
        if (circle.getAttr('x') == polyPoints[i] && circle.getAttr('y') == polyPoints[i + 1]) {
          xChange = i
          yChange = i + 1
          break
        }
      }
    })
    circle.on('dragmove', (e) => {
      //更改拖拽多边形点的位置
      let polyPoints = this.currentDrawingShape
        .getChildren((element) => {
          return element.getClassName() === 'Line'
        })[0]
        .points()
      /*   e.evt.offsetX - this.currentDrawingShape.getAttr('x') ---> 抵消拖动组的xy影响  */
      polyPoints[xChange] = e.evt.offsetX - this.currentDrawingShape.getAttr('x')
      polyPoints[yChange] = e.evt.offsetY - this.currentDrawingShape.getAttr('y')
      this.currentDrawingShape
        .getChildren((element) => {
          return element.getClassName() === 'Line'
        })[0]
        .points(polyPoints)
    })
    return circle
  }
  /**
   *多边形
   * @param points 多边形绘画的各个顶点，类型数组
   */
  drawPloygon = (points) => {
    const poly = new Konva.Line({
      name: 'poly',
      points: points,
      fill: 'red',
      stroke: 'red',
      strokeWidth: 1,
      draggable: false,
      opacity: 0.3,
      lineCap: 'round',
      lineJoin: 'round',
      closed: true,
      strokeScaleEnabled: false,
    })
    this.currentDrawingShape = poly
    this.layer.add(poly)
    this.layer.draw()
    poly.on('mouseenter', (e) => {
      this.stage.container().style.cursor = 'move'
    })
    poly.on('mouseleave', (e) => {
      this.stage.container().style.cursor = 'crosshair'
    })
    poly.on('mousedown', (e) => {
      //如果不是正在绘画图形时，可以显示顶点
      if (!this.drawing) {
        this.stage.container().style.cursor = 'move'
        console.log('mousedown')
        //设置现在绘画节点的对象为该多边形和顶点的组
        this.currentDrawingShape = poly.getParent()
        console.log('element',this.currentDrawingShape);
        //先隐藏全部顶点
        this.stage.find('Circle').forEach((element) => {
         
          element.hide()
          //解绑第一个红色顶点的事件
          element.off('mousedown')
        })
        //显示现在操作多边形的原来的顶点
        this.currentDrawingShape
          .getChildren((element) => {
            return element.getClassName() === 'Circle'
          })
          .forEach((element) => {
            element.show()
            // element.setAttr('draggable', true)
          })
        // 如果要让顶点和多边形一起拖拽，必须设置，多边形不能被拖拽
        poly.setAttr('draggable', false)
        // poly.getParent().setAttr('draggable', true)
        //使所有顶点在顶层显示
        this.stage.find('Circle').forEach((element) => {
          element.moveToTop()
        })
        this.layer.draw()
      } else {
        //绘画时，鼠标移入多边形，设置组不可以拖动
        this.stage.container().style.cursor = 'crosshair'
        poly.getParent().setAttr('draggable', false)
      }
    })

    poly.getParent().on('dragend', (e) => {
      this.stage.container().style.cursor = 'crosshair'
      poly.getParent().setAttr('draggable', false)
    })
    return poly
  }
  /**
   * 在舞台上鼠标点下发生的事件
   * @param currentTool 当前选择的工具
   * @param e 传入的event对象
   */
  stageMousedown = (currentTool, e) => {
    //如果数组长度小于2，初始化多边形和顶点，是它们成为一组,否则什么都不做
    if (this.polygonPoints.length < 2) {
      let x = e.evt.offsetX,
        y = e.evt.offsetY
      //拖拽组
      let group = new Konva.Group({
        x: 0,
        y: 0,
        name: 'pointsAndPoly',
        draggable: false,
      })
      //添加多边形的点
      group.add(this.addPoint(e))
      //绘画多边形
      this.polygonPoints = [x, y]
      group.add(this.drawPloygon(this.polygonPoints))
      //使所有顶点在顶层显示
      this.stage.find('Circle').forEach((element) => {
        element.moveToTop()
      })
      this.layer.add(group)
      this.stage.draw()
    } //多边形增加顶点
    else {
      let x = e.evt.offsetX,
        y = e.evt.offsetY
      //group继续添加多边形的点
      this.currentDrawingShape.getParent().add(this.addPoint(e))
      this.polygonPoints.push(x)
      this.polygonPoints.push(y)
      //绘画多边形
      this.currentDrawingShape.setAttr('points', this.polygonPoints)
      //使所有顶点在顶层显示
      this.stage.find('Circle').forEach((element) => {
        element.moveToTop()
      })
      this.stage.draw()
    }
    this.drawing = true
  }
  /**
   * 鼠标在舞台上移动事件
   * @param currentTool 当前选择的工具
   * @param e 传入的event对象
   */
  stageMousemove = (currentTool, e) => {
    switch (currentTool) {
      case 'rect':
        //绘画矩形中
        this.currentDrawingShape.setAttrs({
          width: e.evt.offsetX - this.pointStart[0],
          height: e.evt.offsetY - this.pointStart[1],
        })
        break
      case 'poly':
        //多边形初始化后，如果数组长度大于2，鼠标移动时，实时更新下一个点
        if (this.polygonPoints.length >= 2) {
          let x = e.evt.offsetX,
            y = e.evt.offsetY
          let tempPoints = this.polygonPoints.concat()
          tempPoints.push(x)
          tempPoints.push(y)
          this.currentDrawingShape.setAttr('points', tempPoints)
        }
        break
      default:
        break
    }
    this.layer.draw()
  }
  /**
   * 鼠标在舞台上移动事件
   * @param currentTool 当前选择的工具
   * @param e 传入的event对象
   */
  stageMouseup = (currentTool, e) => {
    switch (currentTool) {
      case 'rect':
        this.drawing = false
        break
      default:
        break
    }
    this.layer.draw()
  }
  /**
   * 增加多边形顶点
   * @param e 传入的event对象
   */
  addPoint = (e) => {
    if (this.polygonPoints.length == 0) {
      //将第一个点标红,并显示
      return this.drawCircle(e.evt.offsetX, e.evt.offsetY)
        .setAttrs({
          fill: 'red',
        })
        .show()
        .on('mousedown', (e) => {
          //点击第一个红点，绘画多边形结束
          //绘画多边形
          this.currentDrawingShape.setAttr('points', this.polygonPoints)
          //结束绘画多边形封闭
          //  this.currentDrawingShape.setAttr('closed', true);
          this.drawing = false
          this.polygonPoints = []
          //隐藏所有顶点
          this.stage.find('Circle').forEach((element) => {
            element.hide()
          })
          //所有顶点变为白色
          this.stage.find('Circle').forEach((element) => {
            element.setAttrs({
              fill: '#ffffff',
            })
          })
          //把现在的绘画对象更改为点和多边形合成的组
          this.currentDrawingShape = this.currentDrawingShape.getParent()
        })
    } else {
      //绘画点并显示
      return this.drawCircle(e.evt.offsetX, e.evt.offsetY).show()
    }
  }

  render() {
    return <div id="container"></div>
  }
}
