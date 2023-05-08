@testable class Demo1 {

    test1 = 1

    get fn4(){
        console.log('fn4')
    }
    // @DemoFnDec
    fn1(){
        console.info('fn1');
    }
}


function testable(target) {
    // console.log('target',target);
    // target.isTestable = true;
  }
  

function DemoFnDec(target, name, descriptor) {
    console.info('target',target);
    console.info('name',name);
    console.info('descriptor',descriptor);

    target.fn2 = function(){
        console.info('fn2');
    }
    descriptor.value = function(){
        console.info('fn3');
    }
}

export default  Demo1

// const demo1 = new Demo1()
// demo1.fn1();
// demo1.fn2();
