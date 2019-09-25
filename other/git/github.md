### 怎么连接github  Connecting to GitHub with SSH
链接来自个github：https://help.github.com/en/articles/connecting-to-github-with-ssh

重点命令
1. ssh -T git@github.com  测试github是否连接
2. eval "$(ssh-agent -s)"  从后台启动ssh-agent，
```
$ eval "$(ssh-agent -s)"
> Agent pid 59566
```
