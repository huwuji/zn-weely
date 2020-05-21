### hash链表和merkle tree
一。主要是链表结构
1.hash指针：
 及是指针（指向位置），又是hash值（记录内容），因为这个hash值是整个区块内容的hash值。
 > 补充：genesis block :创世区块
 most recent block:最近区块
 temper evident log:
 
 2.区块链：
 定义：用hash指针来指向上一个区块的链表。（hash值是上一个区块的内容的hash值）
 
 3.区块链的验证方式：
 从最近区块链开始，用上一个区块的内容取hash值看是不是等于当去区块记录的hash指针。一直往前去校验。

 4.要篡改一个区块，就要篡改该区块后面所有的区块的hash值，构建一个比现有区块链更长的一个区块链。

二。 merkle tree
1. 什么是merkle tree
 对比binary tree(二叉树)，merkle tree 是用hash表示内部节点的二叉树。
 > 什么是内部节点：非叶子节点的节点。
 
 2.特点：只要记录这个树跟节点（root point）的hash ,就能记录这个树的正确性。

 !!!3.一个区块的内容：（重要）
 存储着 block header和block body。
 block header存储着这个该区块的所有交易的hash值。
 block body存储着交易的所有记录。

 4.全节点和轻节点
 全节点：存储该区块的所有的交易记录。
 轻节点：发生交易的节点到跟节点的路径。
 