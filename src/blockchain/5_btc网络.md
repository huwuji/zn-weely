### the bitcoin network
1. 
application layer : bitcoin block chain
network layer :  p2p overly network

2. 要加入btc 网络，需要一个seed node（种子节点）,从该节点去获取其他btc网络节点的信息。

3. 节点中的交互是通过tcp来通信的。
>为什么tcp有利于传统防火墙？

4. 退出btc 网络，只需要退出自己的应用程序。不需要去通知其他节点，一定时间后，其他节点未收到你的节点的信息，自动会删除。


5. btc 网络的设计原则是
simple,robust,but not efficient

传递的原则是flooding()

6. btc协议对btc区块的限制是1M大小，目前也保证一定的传输速度。

7. btc传输是 best effort:中文名称是尽力服务，释义是标准的因特网服务模式。
> best effort:解 释: 标准的因特网服务模式。在网络接口发生拥塞时，不顾及用户或应用，马上丢弃数据包，直到业务量有所减少为止。
> Best-effort delivery是指一种网络服务，在这类服务中不保证将数据传递出去，或不保证用户的QoS水平或一定的优先级。在最大努力网络中，所以用户获得最大努力服务，也就是说用户所获得的比特率和传输时间是不固定的，这取决于当前网络的通信荷载的大小。
