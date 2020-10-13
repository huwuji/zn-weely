### tree
1. 
```
var lowestCommonAncestor = function(root, p, q) {
    let indexP=root.findIndex(v=>v===p);
    let indexQ=root.findIndex(v=>v===q);

    while(indexP!==indexQ&&indexP>=0&&indexQ>=0){
        if(indexP>indexQ){
            indexP=parseInt((indexP-1)/2,10);
        }
        if(indexP<indexQ){
            indexQ=parseInt((indexQ-1)/2,10);
        }
    }

    return root[indexP];
};

console.log(lowestCommonAncestor([6,2,8,0,4,7,9,null,null,3,5], 0, 4))
```
2. 
```
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function(root, p, q) {
          console.log('root, p, q==',root, p, q)

    // let indexP=root.findIndex(v=>v===p);
    // let indexQ=root.findIndex(v=>v===q);
    
    let rootArray=[];
    let rootHeap=[];

    rootArray.push(root.val);
    rootHeap.push(root);

  function getRootArray(tree){
    console.log('11111==',tree,rootArray,rootHeap)
      if(!tree.val){
            return ;
        }
        
        rootArray.push(tree.left&&tree.left.val);
        rootArray.push(tree.right&&tree.right.val);
        if(tree.left&&tree.left.val){
            rootHeap.push(tree.left);
        }
        if(tree.right&&tree.right.val){
            rootHeap.push(tree.right);
        }
        console.log('getRootArray==',rootArray)
    };


    while(rootHeap.length>0){
        let node=rootHeap.pop();
        getRootArray(node,rootArray,rootHeap);
    }

  
    console.log('0000==',rootArray)
    let indexP=rootArray.findIndex(v=>v===p);
    let indexQ=rootArray.findIndex(v=>v===q);
    while(indexP!==indexQ&&indexP>=0&&indexQ>=0){
        if(indexP>indexQ){
            indexP=parseInt((indexP-1)/2,10);
        }
        if(indexP<indexQ){
            indexQ=parseInt((indexQ-1)/2,10);
        }
    }

    return root[indexP];
};

```