#### graphql实践和个人理解--接口中心新加graphql接口类型

一。 graphql的简单理解


二。 接口中心graql任务流程图。
1. 接口中心的目的：
    * 能够新建和编辑graphql文件。
    * 能够通过输入得到输出数据。
2. 大致流程（关于对graphql的操作）
（todo：此处应该加上相关的流程图）
   * 前端页面：(校验schema)
    需要校验schema文件是否符合标准，检验方式是使用官方提供的api。

    > 个人思考：（有些累赘）
    个人理解graphql也是一层，一个夹在前后端之间，方便数据交互的一个数据结构规范。
    这里的前后端，除了客户端和服务端，还有人和程序。如果是单纯客户端和后端之间识别的数据结构的话，就可以直接定义类似树型结构的数据或者更贴近程序识别和执行的结构（二进制？）。类比二进制--机器码--高级程序语言。
    所以涉及到人理解的话，还需要做一层转化，转化成人易于编写使用的，这就需要解析器。而人方便识别的结构其实又很类似，一个人类方便识别的结构在不同的环境下被不同的方式解析，最后可能会变成多中不同的程序。
    前面这些其实只是为了说明：这里的校验不能直接把最表层的现象或数据用来校验，因为它的环境不的定，有太多不可靠性，所有需要转化到特定环境下去校验。怎么去转化呢？一般定义这样结构的程序会提供一个特定的解析方式，所有先找到特定的解析方式，再把解析后的结构做校验看是不是正确的结构。

   todo：这里验证方式需要再仔细研究下，这不是一个好的方式。
   ```
    // gql是字符串转化为graphql语法树的方法
    import gql from 'graphql-tag';
    //todo：这里应该有更好的校验函数，validateSDL是源码提供的，但是并没有暴露出来，
    import { validateSDL } from 'graphql/validation/validate';

    let schemaError = []
    const gqlQuery = gql(schemaText)
    schemaError = validateSDL(gqlQuery)
    if (schemaError.length === 0) {
        message.success("schema校验通过")
        // todo:调用接口，上传到后端，存入接口列表库中。
    }
    else {
        message.error("schema有误：", schemaError)
    }

   ```
   > import gql from 'graphql-tag';
   gql: This is a template literal tag you can use to concisely write a GraphQL query that is parsed into the standard GraphQL AST:

    ```
    import gql from 'graphql-tag';

    const query = gql`
    {
        user(id: 5) {
        firstName
        lastName
        }
    }
    `

    // query is now a GraphQL syntax tree object
    console.log(query);

    // {
    //   "kind": "Document",
    //   "definitions": [
    //     {
    //       "kind": "OperationDefinition",
    //       "operation": "query",
    //       "name": null,
    //       "variableDefinitions": null,
    //       "directives": [],
    //       "selectionSet": {
    //         "kind": "SelectionSet",
    //         "selections": [
    //           {
    //             "kind": "Field",
    //             "alias": null,
    //             "name": {
    //               "kind": "Name",
    //               "value": "user",
    //               ...
    ```

    
