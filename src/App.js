import { OmitProps } from 'antd/es/transfer/ListBody'
import './App.css'
// import MainStage from './page/MainStage'
// import Page1 from './page/page1'
// import Page2 from './page/page2'
// import Page3 from './page/page3'  工位
// import ReactFlv from './flv/react-flv';
// import BlueTooth from './bluetooth';
// import FabricPage from './page/fabric'
import QRCodeCom from './page/qrcode'

// function App() {
//   let [count, setCount] = useState(0)
//   let [name, setName] = useState(null)

//   useEffect(() => {

//     // Demo1.fn1();

//     Demo1.prototype.age = 18
//     // console.log(Demo1.prototype);
//     let a = new Demo1()
//     console.log(a.age);
//     // console.log( a.__proto__.constructor ===  Demo1.prototype.constructor);

// //    console.log('----',new Demo1.constructor().fn2());
//   }, [count])

//   const add = () => {
//     let c = count + 1
//     setCount(c)
//   }

//   const changeName = () => {

//     setName(generateRandom())
//   }

//   const generateRandom = () => {
//     return Math.random().toString(16).slice(2)
//   }

//   return (
//     <div className="App">
//       <button onClick={() => add()}>点击我</button>
//       <button onClick={() => changeName()}>设置名字</button>
//       <p>{count}</p>
//       <p>{name}</p>
//     </div>
//   )
// }

function App() {
  return (
    <QRCodeCom/>
    // <FabricPage/>
    // <BlueTooth/>
    // <Page3/>
    // <MainStage
    //   onSelectSeat={(seatId) => {
    //     console.log('selected - ' + seatId)
    //   }}
    // />
  )
}

export default App
