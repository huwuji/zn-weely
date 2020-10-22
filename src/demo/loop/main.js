import looper from './module_a.js';

function req(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log('req....');
            resolve({id:10});
        },400)
    })
}

const myLooper=new looper();
console.log('myLooper==',myLooper)
myLooper.initController();
console.log('myLooper00==',myLooper)
function start(num,req){
    myLooper.start(num,req);
} 
function stop(){
    myLooper.stop();
} 