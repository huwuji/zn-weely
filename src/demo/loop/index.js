

function req(){
	return new Promise((resolve)=>{
		setTimeout(()=>{
			console.log('req....');
			resolve({id:10});
		},400)
	})
}

function loop(t){
	const isBlock=controller.getStatus().isBlock;
	if(isBlock){
		return 'block';
	}

	const isReqing=controller.getStatus().isReqing;
	if(isReqing){
		return 'reqing';
	}
	controller.setStatus('isReqing',true);
	const reqPromiser= req();
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
		loop(t);
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
const controller=control();


function stop(){
    console.log('stop');
	controller.setStatus('isBlock',true);
}

function start(num){
    console.log('start');
	controller.setStatus('isBlock',false);
	loop(num);
}
