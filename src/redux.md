### redux 源码
1. createStore
	参数：(reducer,enhancer)
	 enhancer

	提供API如下：

	1）subscribe
		```
		   * @param listener A callback to be invoked on every dispatch.
	   	* @returns A function to remove this change listener.
		```


	2） dispatch
	```
		 function dispatch(action: A) {
	    if (!isPlainObject(action)) {
	      throw new Error(
	        'Actions must be plain objects. ' +
	          'Use custom middleware for async actions.'
	      )
	    }
	    if (typeof action.type === 'undefined') {
	      throw new Error(
	        'Actions may not have an undefined "type" property. ' +
	          'Have you misspelled a constant?'
	      )
	    }
	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.')
	    }

	    try {
	      isDispatching = true
	      currentState = currentReducer(currentState, action)
	    } finally {
	      isDispatching = false
	    }

	    const listeners = (currentListeners = nextListeners)
	    for (let i = 0; i < listeners.length; i++) {
	      const listener = listeners[i]
	      listener()
	    }

	    return action
	  }
	```


	找到对应的reducer，修改state值。修改值的时候有锁。然后执行listeners的所有方法。在返回action对象。

	3）getstate

	```
	   * @returns The current state tree of your application.

	```


在creactStore的时候有这么一段
```
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(
      reducer,
      preloadedState as PreloadedState<S>
    ) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
  }
```
那我们来看下enhance

>   * @param enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.

我们的applyMiddleware是redux提供的enhance函数

2. applyMiddleware
```
export default function applyMiddleware(
  ...middlewares: Middleware[]
): StoreEnhancer<any> {
  return (createStore: StoreEnhancerStoreCreator) => <S, A extends AnyAction>(
    reducer: Reducer<S, A>,
    preloadedState?: PreloadedState<S>
  ) => {
    const store = createStore(reducer, preloadedState)
    let dispatch: Dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose<typeof dispatch>(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```
增强了dispatch的功能。


3. compose
```
export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args: any) => a(b(...args)))
}
```

使用函数式的方式，一层层传递dispatch,一层层拓展功能。

4. combineReducers

5. bindActionCreators

其他的api都比较好理解。

整体来说，redux提供了一条数据交互的规范，以及提供了一个中间件的接入接口（规范）；比如后面的saga中间件。







