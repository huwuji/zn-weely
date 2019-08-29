### 冒烟测试
 
1. 冒烟测试时什么：
   > 维基百科解释：
   smoke testing  is preliminary testing to reveal simple failures severe enough to, for example, reject a prospective software release. Smoke tests are a subset of [test cases] that cover the most important functionality of a component or system, used to aid assessment if main functions of the software appear to work correctly.[1][2] When used to determine if a computer program should be subjected to further, more fine-grained testing, a smoke test may be called an intake test.[1] Alternately, it is a set of tests run on each new build of a product to verify that the build is testable before the build is released into the hands of the test team.[5] In the DevOps paradigm, use of a BVT step is one hallmark of the continuous integration maturity stage.

    冒烟测试这个名称的来历，最初是从电路板测试得来的。因为当电路板做好以后，首先会加电测试，如果板子没有冒烟再进行其它测试，否则就必须重新来过.
    冒烟测试可以理解为是在每日build（构建版本）建立后，对系统的基本功能进行简单的测试。这种测试强调程序的主要功能进行的验证，而不会对具体功能进行更深入的测试。
    所以冒烟测试有另一种说法：BVT（Build Verification Testing）

2. 怎么去做做一个冒烟测试？？mocha
