### iconv
iconv命令是用来转换文件的编码方式的，比如它可以将UTF8编码的转换成GB18030的编码，反过来也行。JDK中也提供了类似的工具native2ascii。Linux下的iconv开发库包括iconv_open,iconv_close,iconv等C函数，可以用来在C/C++程序中很方便的转换字符编码，这在抓取网页的程序中很有用处，而iconv命令在调试此类程序时用得着。

选项
>-f encoding :把字符从encoding编码开始转换。 
-t encoding :把字符转换到encoding编码。 
-l :列出已知的编码字符集合 
-o file :指定输出文件 
-c :忽略输出的非法字符 
-s :禁止警告信息，但不是错误信息 
--verbose :显示进度信息 
-f和-t所能指定的合法字符在-l选项的命令里面都列出来了。 

for example
> iconv -l      列出当前支持的字符编码： 

iconv -f UTF-8 -t UTF-16LE file1>file2      将文件file1转码，转后文件输出到fil2中：-o是标准输出


引用
```
Convert encoding of a file from one character set encoding to another.

Syntax
      iconv [Option...] -f encoding -t encoding inputfile 
      iconv -l

Options

   -f encoding
   --from-code encoding
          Convert characters From encoding.

   -t encoding
   --to-code encoding
          Convert characters To encoding.

   --list
          List known coded character sets
          The encodings available are system dependent.

   -o file
   --output file
          Specify an output file (instead of stdout.)

Options controlling conversion problems:

   -c     When this option is given, characters that cannot be converted are silently
          discarded, instead of leading to a conversion error.

   --unicode-subst=formatstring
          Replace Unicode characters that cannot be represented in the target
          encoding with a placeholder string that is constructed from formatstring,
          applied to the Unicode code point. The formatstring must be in the same
          format as for the printf command or the  printf() function, taking either
          no argument or exactly one unsigned integer argument.

   --byte-subst=formatstring
          Replace bytes in the input that are not valid in the source encoding 
          with a placeholder string constructed from the given formatstring,
          applied to the byte's value. The formatstring must be in the same
          format as for the printf command or  the  printf()  function, taking either
          no argument or exactly one unsigned integer argument.

   --widechar-subst=formatstring
          Replace wide characters in the input that are not valid in the source
          encoding with a placeholder string that is constructed from the given
          formatstring, applied to the byte's value. The formatstring must
          be in the same format as for the printf command or the  printf() function,
          taking either no argument or exactly one unsigned integer argument.

Options controlling error output:

   −s
   −−silent
        Suppress error messages about invalid or unconvertible characters are omitted

   --verbose
        Print progress information. 
```