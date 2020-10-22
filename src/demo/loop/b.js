

function loop(t,callback=function(){}){
	const isBlock=controller.getStatus().isBlock;
	if(isBlock){
		return 'block';
	}

	const isReqing=controller.getStatus().isReqing;
	if(isReqing){
		return 'reqing';
	}
	controller.setStatus('isReqing',true);
	const reqPromiser= callback();
    reqPromiser
    .then(()=>{
	    controller.setStatus('isReqing',false);
	})
    .catch((err)=>{
        console.log('err',err);
	    controller.setStatus('isReqing',false);
	})

	let timer=null;
	timer=setTimeout(()=>{
		clearTimeout(timer);
		loop(t,callback);
	},t)
}

function control(){
	let status={
		isBlock:false,
		isReqing:false,
	};
	return {
		getStatus:function(){
			return status;
		},
		setStatus:function(type,value){
			status[type]=value;
			return status;
		},
	}
}
function initController(){
	const controller=control();
	window.controller=controller;
}


function stop(){
    console.log('stop');
	controller.setStatus('isBlock',true);
}

function start(num,callback){
    console.log('start');
	controller.setStatus('isBlock',false);
	loop(num,callback);
}

