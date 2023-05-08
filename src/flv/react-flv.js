import React from 'react'
import flvJs from 'flv.js'
import { Modal } from 'antd'

export default class ReactFlv extends React.Component {
  flvPlayer = null
  componentDidMount() {
    this.load()
    this.timer = setInterval(() => {
      this.jumpToEndBuffer()
    }, 30 * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  load = () => {
    if (flvJs.isSupported()) {
      //检查flvjs能否正常使用
      let videoElement = document.getElementById('videoElement') //使用id选择器找到第二步设置的dom元素
      this.flvPlayer = flvJs.createPlayer(
        {
          //创建一个新的flv播放器对象
          type: 'flv', //类型flv
          isLive: true, // 是否是直播流
          hasAudio: true, // 是否有音频
          hanVideo: true, // 是否有视频
          url: 'http://172.16.40.57:8080/live/stream1.flv', //flv文件地址
        },
        {
          enableWorker: false,
          enableStashBuffer: false,
          // 其他的配置项可以根据项目实际情况参考 api 去配置
          autoCleanupMinBackwardDuration: true, // 清除缓存 对 SourceBuffer 进行自动清理
        }
      )
      this.flvPlayer.attachMediaElement(videoElement) //将flv视频装载进video元素内
      this.flvPlayer.load() //载入视频
      Modal.confirm({
        content: <div style={{height: 100,fontSize:18,display:'flex',alignItems:'center'}}>由于浏览器的设置限制,需要您手动进行自动播放,是否继续?</div>,
        centered: true,
        width:'55%',
        okText:'自动播放',
        cancelText:'取消',
        onOk: () => {
            this.autoPlay();
          Modal.destroyAll();
        },
      })
    }
  }

  jumpToEndBuffer = () => {
    let buffered = this.flvPlayer.buffered
    console.log('buffered', buffered)
    if (buffered.length > 0) {
      let end = buffered.end(0)
      if (end - this.flvPlayer.currentTime > 0.2) {
        this.flvPlayer.currentTime = end - 0.1
      }
    }
  }

  autoPlay = () => {
    this.flvPlayer
      .play()
      .then(() => {
        console.log('播放成功')
      })
      .catch((err) => {
        console.log('播放失败', err)
      })
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <video id="videoElement" controls style={{ width: '100%', height: '80%' }}></video>
      </div>
    )
  }
}
