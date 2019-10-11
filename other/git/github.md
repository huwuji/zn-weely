### 怎么连接github  Connecting to GitHub with SSH
链接来自个github：https://help.github.com/en/articles/connecting-to-github-with-ssh

重点命令
1. ssh -T git@github.com  测试github是否连接
2. eval "$(ssh-agent -s)"  从后台启动ssh-agent，
```
$ eval "$(ssh-agent -s)"
> Agent pid 59566
```

特殊情况：
```
1.先使用 ssh-agent -s

SSH_AUTH_SOCK=/var/folders/c6/_lb54v1d4v14_0j4_nt_1vj00000gp/T//ssh-B57Gx7MencHN/agent.32676; export SSH_AUTH_SOCK;
SSH_AGENT_PID=32677; export SSH_AGENT_PID;
echo Agent pid 32677;


2.再使用 ssh-add ~/.ssh/id_rsa

Identity added: /Users/faye/.ssh/id_rsa (/Users/faye/.ssh/id_rsa)

 

3.最后测试 ssh -T git@github.com

 

Hi nitt! You've successfully authenticated, but GitHub does not provide shell access.
```