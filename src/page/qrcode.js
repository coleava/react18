import React from "react";
import QRCode from 'qrcode.react'

export default class QRCodeCom extends  React.Component {
  render(){
    return <QRCode
      value="http://172.16.25.4:3000/#/booking/create/648ad790fa107602bd422be2?"
      size={200}
      fgColor="#000"
      style={{margin: 20}}
    />
  }
}