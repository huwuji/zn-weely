### graphQL简要理解
简介：

-------
schema: 
1. 类型声明字段:type,union,interface,input,enum,scalar
2. 类型分类：对象（用type,scalar声明），联合(union)，接口（interface），枚举（enum），标量（scalar）
3. 个人理解在分类：
    类对象结构：声明字段 type,union,interface,input
    枚举结构：声明字段 enum
    基础结构类型（标量类型）：声明字段 scalar， 包括默认标量类型（Int：有符号 32 位整数；Float：有符号双精度浮点值；String：UTF‐8 字符序列；Boolean：true 或者 false；ID：ID 标量类型表示一个唯一标识符，通常用以重新获取对象或者作为缓存中的键。ID 类型使用和 String 一样的方式序列化；然而将其定义为 ID 意味着并不需要人类可读型。）和自定义标量类型。

4. !!!查找graphQL的入口：query 和 mutation 字段，定义的是操作方法

5. 基本的一个schema类型组成结构：
    类型声明字段 + 对象名称 + 引用修饰（可选项） {
        字段（field）+  参数（可选项+默认值） + 类型对象（更多是指向另一个具体对象） + 类型修饰符
    }

栗子：schema
```
type Query {
   greeting:String
   students:[Student]
   test:ColorType
   studentById(id:ID!):Student
   sayHello(name:String!):String
}
enum ColorType {
   RED
   BLUE
   GREEN
}
type Student {
   id:ID!
   firstName:String
   lastName:String
   password:String
   collegeId:String
   fullName:String
   college: College
}
```


-----
query(指行为，并不是query类型对象)
 基本的一个query类型组成结构：
 操作类型（query,mutation,subscription）+ 操作名称 + 变量(变量名+变量类型or默认值){
     字段（fields）+别名（可选值） + 参数（参数的值） + 指令（可选择）{
         所需结构字段
         or
         fragment片段
         or
         内联片段
     }
 }

```
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends){ //指令
      name
    }
  }
  rightComparison: hero(episode: $episode) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```