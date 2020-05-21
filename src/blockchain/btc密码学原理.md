### hash算法和数字签名（非对称加密）
一。hash算法
1.hash算法 （256位，因为数位限制，都是存在暴力破解的可能，只是难度很大）
    a.假定不可逆
    b.假定不同的输入得不到同样的输出
 
1.1 md5

2.比特币中的hash算法-- SHA-256
SHA:指的是secure hash algorithm

3.区块的算法：挖矿
H(block header)<=target
已知：target与H(sha-256),求block header，
而block header是由一个默认的公式，而这个公式只能改变一个变量（nonce）
计算block header的过程就是挖矿的过程。
把得到的block header验证公式H(block header)<=target的过程也是工作量证明（proof of work）的过程。

性质：difficult to solve and easy to verify

二。 数字签名
非对称加密
数字签名：把message先用hash加密，然后在加上private key（私钥）再进行hash加密，来进行签名。
然后用public key（公钥）来验证。（？？？怎么验证？？）