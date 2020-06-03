1. stack based language
基于脚本语言
唯一能访问的内存空间就是一个栈

2. 交易结构
```
"result":{
    txid:'hash....',//交易币的来源id地址
    hash:'11111hash',//交易的hash值
    version:1,//交易的版本
    size:226,//交易的大小
    locktime:0,//交易的生效时间。0是立即生效，生效即是写入区块链
    vin：‘’，//交易的输入
    vout：‘’//交易的输出
    blockhash:“000000”//此次交易所在的hash值，
    confirmations:23,//交易的确认信息
    time:,//
    blocktime,//交易距现在的时间
}
```

3. 交易的输入
```
vin:[
    {
        txid:'',//交易中币的来源的hash值
        vout:0,//这个交易里的第几个输出
        scriptSig:{
            asm:'',       hex:'',
        },//输入脚本
    }
]
```

4. 交易的输出
```
vout:[
    {
        value:0.222,//交易的金额
        n:0,
        scriptPubKey:{
            asm:'DUPkk',//输入脚本内容，包含一系列操作
            hex:'',//签名
            reqSigs:1,//需要签名树
            type:'pubkeyhash',
            addresses:['18318sr5sfe5wse...']//输出地址
        }
    }
]
```

5. 交易的校验
假如有两个交易：
a.  A--->B
b.  B--->C

验证交易，先执行b交易的输入脚本，再执行a交易的输出脚本。看都能执行成功

6. 比特币的脚本执行的步骤就是把hash值压入栈，然后在出栈验证。也就是用公钥自动化验证hash签名

7. P2PK(pay to publick key) 
步骤：
输入脚本就是把签名和公钥压入栈，

输出：复制栈顶元素，取hash值，把公钥hash压入栈，比较栈顶的两个hash值，比较签名

8. 
