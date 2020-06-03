
####
1. transaction-based ledger
全节点要在内存中维护UTXO结构，目的是为了检测多次交易。需要产生这次交易的hash值，以及在这个交易里是第几个输出，来定位在UTXO中的输出。
 那什么是UTXO结构：
 unspent transaction output(未花费的交易的输出)

 2. account-based ledger


> https://www.blockchain.com/explorer   区块链记录查看
https://learnmeabitcoin.com

挖矿公式：
H(H(block header)+nonce+(merkle tree))


block header结构体：
todo: