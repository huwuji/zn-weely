### web at Google I/O 2019

## webAssembly for web Developers

1. 在js中可以用#xxx表示一个私有变量
2. matchall
```
matchAll() 方法返回一个包含所有匹配正则表达式及分组捕获结果的迭代器。

str.matchAll(regexp)
参数：regexp
    正则表达式对象。如果所传参数不是一个正则表达式对象，则会隐式地使用 new RegExp(obj) 将其转换为一个 RegExp 。
返回值：
一个迭代器（不可重用，结果耗尽需要再次调用方法，获取一个新的迭代器）

例子：
使用match:
    const regexp = RegExp('foo*','g');
    const str = 'table football, foosball';

    while ((matches = regexp.exec(str)) !== null) {
    console.log(`Found ${matches[0]}. Next starts at ${regexp.lastIndex}.`);
    // expected output: "Found foo. Next starts at 9."
    // expected output: "Found foo. Next starts at 19."
    }

使用matchAll
    const regexp = RegExp('foo*','g'); 
    const str = 'table football, foosball';
    let matches = str.matchAll(regexp);

    for (const match of matches) {
    console.log(match);
    }
    // Array [ "foo" ]
    // Array [ "foo" ]

    // matches iterator is exhausted after the for..of iteration
    // Call matchAll again to create a new iterator
    matches = str.matchAll(regexp);

    Array.from(matches, m => m[0]);
    // Array [ "foo", "foo" ]

```

3. large numeric
    1_000_000_000

4. bigInts
    122433434567 *123  x
    122321435456n * 123 
    123_123_121_123n * 123

5. flat flatArray

6. Object.fromEntries
7. globalThis
8. stable sort
9. Intl.RelativeTimeFormat
    >>>该对象是对象的构造函数,用于启用语言敏感的相对时间格式。
    ```
        var rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });

        console.log(rtf1.format(3, 'quarter'));
        //expected output: "in 3 qtrs."

        console.log(rtf1.format(-1, 'day'));
        //expected output: "1 day ago"

        var rtf2 = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

        console.log(rtf2.format(2, 'day'));
        //expected output: "pasado mañana"


        new Intl.RelativeTimeFormat([locales[, options]])

        locales
            可选的。带有BCP 47语言标记的字符串,或此类字符串的数组。有关参数的一般形式和解释locales,请参阅Intl page。

        options
            可选的。具有以下部分或全部属性的对象：
            localeMatcher
            要使用的区域设置匹配算法。可能的值是"lookup"和"best fit"; 默认是"best fit"。有关此选项的信息,请参阅Intl。
            numeric
            输出消息的格式。可能的值是：
            "always"(默认,例如,1 day ago),
            或"auto"(例如yesterday)。该"auto"值允许不必总是在输出中使用数值。
            style
            国际化信息的长度。可能的值是：
            "long"(默认,例如,in 1 month)
            "short"(例如in 1 mo.),
            或"narrow"(例如in 1 mo.)。狭窄的风格可能类似于某些语言环境的短风格。

    ```

    10. Intl.ListFormat
    11. promise
        .all
        .race
        .any

        Promise.allSettled 

    12. weakRef 
