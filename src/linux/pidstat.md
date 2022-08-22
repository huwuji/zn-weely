#### pidstat 查看进程消耗资

1. 概述
   pidstat 是 sysstat 工具的一个命令，用于监控全部或指定进程的 cpu、内存、线程、设备 IO 等系统资源的占用情况。

   > The pidstat command is used for monitoring individual tasks currently being managed by the Linux kernel.

   pidstat 首次运行时显示自系统启动开始的各项统计信息，之后运行 pidstat 将显示自上次运行该命令以后的统计信息。用户可以通过指定统计的次数和时间来获得所需的统计信息。

2. 安装 installation
   pidstat 是 sysstat 软件套件的一部分，sysstat 包含很多监控 linux 系统状态的工具，它能够从大多数 linux 发行版的软件源中获得。

   ```
   在 Debian/Ubuntu 系统中可以使用下面的命令来安装:
   apt-get install sysstat
   CentOS/Fedora/RHEL 版本的 linux 中则使用下面的命令：
   yum install sysstat
   ```

3. 使用 usage

   > pidstat [options] [interval] [times]
   > pidstat [ 选项 ] [ <时间间隔> ] [ <次数> ]

   常用的参数：

   - -u 默认参数，显示各个进程的 CPU 统计信息
   - -r 显示各个进程的内存使用情况
   - -d 显示各个进程的 IO 使用
   - -w 显示各个进程的上下文切换
   - -p PID 指定 PID
   - -t：显示选择任务的线程的统计信息外的额外信息
   - -T { TASK | CHILD | ALL }
     这个选项指定了 pidstat 监控的。TASK 表示报告独立的 task，CHILD 关键字表示报告进程下所有线程统计信息。ALL 表示报告独立的 task 和 task 下面的所有线程。
     注意：task 和子线程的全局的统计信息和 pidstat 选项无关。这些统计信息不会对应到当前的统计间隔，这些统计信息只有在子线程 kill 或者完成的时候才会被收集。
   - -V：版本号
   - -h：在一行上显示了所有活动，这样其他程序可以容易解析。
   - -I：在 SMP 环境，表示任务的 CPU 使用率/内核数量
   - -l：显示命令名和所有参数

   例如：
   查看一个进程的内存并监控：

   ```
       pidstat -r -p xxx 1 100 //监控进程xxx的内存，每一秒钟打印一次数据，一共查看100次
   ```

   查看所有进程 CPU 使用情况
   ···
   pidstat -u -p ALL
   ···

> 更多查看进程占用内存的方式

```
 // 1. pidstat linux指令
 pidstat -r -p xxx 1 100

 // 2. ps 一次性查看进程

 // 3. top/htop 动态查看内存占用，及对进程进行监控
 top/htop -p xxx

```
