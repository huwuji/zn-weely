const str=`<HTML meta="test" >
    <head>
        <title> 
		test</title>
    </head>
    <body>
        <img src="..." />
		<div class="cls">
					parseH  tml
		</div>
    </body>
</HTML>`;
/**
简单的html解析器，
主要处理开始标签<** >，结束标签</ **>，自闭标签<**  />
*/
function parseHtml(str){
	let tokenStack=[];
	
	let token={}
	let  state = data;
	this.str=str;

	this.start=function(){
		for (let char of this.str) {
			state = state(char);
		}
		return tokenStack;
	}

	function data(c){
		if(c===null){
			throw Error('not ')
		}
		if(c==='<'){
			return tagOpen;
		}
		if(c.match(/\s/)){
			return data;
		}
		if(c.match(/[a-zA-Z0-9\s+-=)]/)){
			token={};
			token.type='text';
			token.name=c;
			return textName			
		}
		return data;
	}

	function tagOpen(c){
		if(c==='/'){
			return endTagOpen;
		}
		if(c.match(/[a-zA-Z]/)){
			token = {}; 
			token.type = 'tag';
			token.name = c.toLowerCase();
			 return tagNameState;
		}
		throw new Error('tagOpen未匹配');

	}

	function tagNameState(c){

		if(c.match(/[a-zA-Z]/)){
			token.name =token.name+ c.toLowerCase();
			 return tagNameState;
		}
		if(c.match(/\s/)){
			emitToken(token);
			return beforeAttributeName;
		}
		if(c==='/'){
			emitToken(token);
			return endTagOpen;
		}
		if(c==='>'){
			emitToken(token);
			return data;
		}
		throw new Error('tagNameState未匹配');

	}

	function beforeAttributeName(c){
		if(c==='/'){
			return endTagOpen;
		}
		if(c==='>'){
			return data;
		}
		if(c.match(/\S/)){
			token={};
			token.type='attr';
			token.name =c;
			return attrNameState;
		}
		if(c.match(/\s/)){
			return beforeAttributeName;
		}

		throw new Error('beforeAttributeName未匹配');
	}

	function textName(c){
		if(c.match(/\n|\t/)){
			return textName;
		}
		if(c.match(/\w|\s/)){
			token.name =token.name+ c;
			return textName;
		}
		if(c==='<'){
			emitToken(token);
			return tagOpen;
		}
		console.log(c)
		throw new Error('textName未匹配');
	}
	function attrNameState(c){
		// todo 匹配字符可以丰富
		if(c.match(/[a-zA-Z0-9-=_"'.]/)){
			token.name =token.name+ c;
			 return attrNameState;
		}
		if(c.match(/\s/)){
			emitToken(token);
			token={};
			token.type='attr';
			token.name =c;
			return beforeAttributeName;
		}
		if(c==='/'){
			emitToken(token);
			return endTagOpen;
		}
		if(c==='>'){
			emitToken(token);
			return data;
		}
		throw new Error('attrNameState未匹配');
	}

	function endTagOpen(c){
		if(c.match(/[a-zA-Z]/)){
			token={};
			token.type='endTag';
			token.name =c.toLowerCase();
			 return endTagName;
		}
		if(c==='>'){
			token={};
			token.type='endTag';
			emitToken(token);
			return data;
		}
		throw new Error('endTagOpen未匹配');
	}

	function endTagName(c){
		if(c.match(/[a-zA-Z]/)){
			token.name =token.name+c.toLowerCase();
			 return endTagName;
		}
		if(c==='>'){
			emitToken(token);
			return data;
		}
		throw new Error('endTagName未匹配');
	}

	function emitToken(t){
		tokenStack.push(t);
		token={};
	}
}



const parse=new parseHtml(str);
const tokenStack=parse.start(parse.str);
console.log(tokenStack)