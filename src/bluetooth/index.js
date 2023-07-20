import { Button } from 'antd'
import React from 'react'

export default class BlueTooth extends React.Component {

    state = {

    }
  connect = () => {

    // console.log(window.h5sdk.config);
    // window.h5sdk.config({
    //     appId: 'cli_a4d211d8d6fc100e',
    //     timestamp: new Date().getTime(),
    //     nonceStr: 11111,
    //     signature: 'AGTth3o1EcnLEQD0fjjHSbqp1R35xWHb',
    //     jsApiList: [],
    //     //鉴权成功回调
    //     onSuccess: (res) => {
    //       console.log(`config success: ${JSON.stringify(res)}`);
    //     },
    //     //鉴权失败回调
    //     onFail: (err) => {
    //       throw `config failed: ${JSON.stringify(err)}`;
    //     }})
    window.tt.openBluetoothAdapter({
      success(res) {
        console.log(JSON.stringify(res))
        window.tt.getBluetoothAdapterState({ 
            success(res2) {
              console.log(JSON.stringify(res2));
              window.tt.startBluetoothDevicesDiscovery({
                services:[],
                allowDuplicatesKey:true,
                success(res3) {
                  console.log(JSON.stringify(res3));
                  window.tt.getBluetoothDevices({
                    success(res1) {
                      console.log('res1',JSON.stringify(res1));
                    },
                    fail(err1) {
                      console.log(`getBluetoothDevices fail: ${JSON.stringify(err1)}`);
                    }
                })
                },
                fail(err2) {
                  console.log(`startBluetoothDevicesDiscovery fail:`,err2);
                }
            })
            },
            fail(res) {
              console.log(`getBluetoothAdapterState fail: ${JSON.stringify(res)}`);
            }
        })
    
  
        // window.tt.getBluetoothAdapterState({
        //   success(res1) {
        //     window.tt.startBluetoothDevicesDiscovery({
               
        //         success(res2) {
        //           console.log(3333,JSON.stringify(res2));
        //         },
        //         fail(err1) {
        //           console.log(`startBluetoothDevicesDiscovery fail: ${JSON.stringify(err1)}`);
        //         }
        //     })
          
        //   },
        //   fail(err2) {
        //     console.log(`getBluetoothAdapterState fail: ${JSON.stringify(err2)}`)
        //   },
        // })
      },
      fail(err3) {
        console.log(`openBluetoothAdapter fail: ${JSON.stringify(err3)}`)
      },
    })
  }

  componentWillReceiveProps(){
    window.tt.setStorageSync('name')
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.connect()}>连接蓝牙</Button>
        <div>
        </div>
      </div>
    )
  }
}
