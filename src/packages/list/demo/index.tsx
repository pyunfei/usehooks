/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import List from '../index';

import './style.css';

const getData = async (throwError?: boolean): Promise<any> => {
  return new Promise<number[]>((resolve, reject) => {
    setTimeout(() => {
      if (throwError) {
        reject(new Error('error'));
      }
      resolve(Array.from({ length: 10 }, (_, i) => i));
    }, 1000);
  });
}

const ListDemo = () => {

  const [list, setList] = useState<Array<number>>([]);
  const [count, setCount] = useState(0);
  const [errorList, setErrorList] = useState<Array<number>>([]);

  const [finished, setFinished] = useState<boolean>(false);
  const onLoad = async () => {
    const data = await getData();
    setList((v) => [...v, ...data]);
    if (list.length >= 30) {
      setFinished(true);
    }
  };

  const onLoadError = async () => {
    // 异步更新数据
    setCount((v) => v + 1);
    const data = await getData(count === 1);
    setErrorList((v) => [...v, ...data]);
    if (list.length >= 30) {
      setFinished(true);
    }
  };


  return <div>
    {
      true ? <List finished={finished} onLoad={onLoad}>
        {list.length
          ? list.map((_, i) => {
            return <div className="item" key={i} >{i + 1}</div>;
          })
          : null}
      </List> :
        <List finished={finished} errorText="请求失败，点击重试" onLoad={onLoadError}>
          {errorList.length
            ? errorList.map((_, i) => {
              return <div className="item" key={i} >{i + 1}</div>;
            })
            : null}
        </List>
    }
  </div>;
};

export default ListDemo
