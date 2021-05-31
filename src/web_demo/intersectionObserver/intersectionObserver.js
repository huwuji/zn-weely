import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'dva';
import _ from 'lodash';
import styles from './index.less';

let page = 1;
const Scroll = ( ) => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.modal.data);
  const hasMore = useSelector(state => state.modal.hasMore);
  const domRef = useRef(null);

  const requestList = useCallback(async (page) => {
    await dispatch({
      type: 'modal/getData',
      payload: {
        page: page
      },
    });
  }, [dispatch]);

  useEffect(() => {
    requestList();
  }, [requestList]);

  const getData = useCallback(
    _.debounce(page => {
      console.log('page====', page)
      if (!hasMore && page !== 1) {
        return;
      }
      // todo请求接口
      requestList(page)
    }, 500),
    [hasMore, dispatch],
  );

  useEffect(_.debounce(() => {
    const intersectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          console.log('entry', entry.isIntersecting, entry)
          page = page + 1;
          // todo拉取数据
          getData(page);
        }
      })
    });
    if (domRef.current) {
      // 开始观察
      intersectionObserver.observe(domRef.current);
    }
    return () => {
      intersectionObserver.unobserve(domRef);
      intersectionObserver.disconnect();
    }
  }, 500), []);
  return (
    <div
      className={styles.wrapper}
    >  
        <div className={styles.content}>
        {
          _.map(list, (item, index) => {
            return (<div key={item.currency} className={styles.item}>
              {index}
            </div>
            )
          }, [])
        }
        < div className={styles.item} ref={domRef}>
          {'bottom'}
        </div>
      </div>
    </div >
  )
}
export default Scroll;