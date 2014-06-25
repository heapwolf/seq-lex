# SYNOPSIS
Creates or increments the value of a lexicographically sortable string

# MOTIVATION
Useful for creating sequential keys in leveldb

# USAGE

```js
var x = lexseq();
console.log(x.charCodeAt(0)); // 0

x = lexseq(x);
console.log(x.charCodeAt(0)); // 1
```
