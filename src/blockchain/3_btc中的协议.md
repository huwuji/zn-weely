### btc交易协议
1. 每次交易包括输入和输出
A-->B
输入要说明btc的来源和A的公钥
输出B的公钥。

每一次交易都是一个脚本

>btc系统中指针都是hash指针

2. btc交易中的区块（block header + block body）
block header
包括：
version(版本)，
hash of previous header（前一个块的hash指针），
merkle root hash（整个块的根目录hash值），
target（与挖矿有关的字段，target代表的是挖矿的难度值）,
nonce （挖矿算法中可以改变的随机数）,
nBits（目标域值的编码==也等于整个block header取hash值）

> 什么是挖矿：
简化公式：fn(H(nBits))<target
求出block header。



block body
包括：
transaction list（交易列表）


>? FLP问题
CAP theorem


3. 分布式共识 distributed consensus

4. consensus in bitCoin
最长链原则
挖矿奖励是btc产生的唯一方式。
每21万个区块奖励减半，一开始每个区块奖励50个btc

5. 假设大部分算力掌握在诚实的人手里。 