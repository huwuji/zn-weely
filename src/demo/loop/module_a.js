
   export default function looper(){
        this.controller={};
    }

    looper.prototype.control=function(){
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

    looper.prototype.loop=function(t,callback=function(){}){
        const isBlock=this.controller.getStatus().isBlock;
        if(isBlock){
            return 'block';
        }

        const isReqing=this.controller.getStatus().isReqing;
        if(isReqing){
            return 'reqing';
        }
        this.controller.setStatus('isReqing',true);
        const reqPromiser= Promise.resolve(callback());
        reqPromiser
        .then(()=>{
            this.controller.setStatus('isReqing',false);
        })
        .catch((err)=>{
            console.log('err',err);
            this.controller.setStatus('isReqing',false);
        })

        let timer=null;
        timer=setTimeout(()=>{
            clearTimeout(timer);
            this.loop(t,callback);
        },t)
    }

    looper.prototype.initController=function (){
        this.controller=this.control();
    }

    looper.prototype.stop=function (){
        console.log('stop',this.controller);
        this.controller.setStatus('isBlock',true);
    }

    looper.prototype.start=function (num,req=function(){}){
        console.log('start',this.controller);
        this.controller.setStatus('isBlock',false);
        this.loop(num,req);
    }

