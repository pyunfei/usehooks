import React from 'react';
import { List, Cell, Tabs } from 'react-vant';
import MyList from './select';
import './demo.css'

const Demo = () => {

  const [list, setList] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [errorList, setErrorList] = React.useState([]);
  const [finished, setFinished] = React.useState(false);

  async function getData(throwError) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (throwError) {
          reject(new Error('出错了'));
        }
        resolve(Array.from({ length: 10 }, (_, i) => i));
      }, 1000);
    });
  }

  const onLoadError = async () => {
    // 异步更新数据
    setCount((v) => v + 1);
    const data = await getData(count === 1);
    setErrorList((v) => [...v, ...data]);
    if (errorList.length >= 30) {
      setFinished(true);
    }
  };

  const onLoad = async () => {
    const data = await getData();
    setList((v) => [...v, ...data]);
    if (list.length >= 30) {
      setFinished(true);
    }
  };

  const CircularIcon = ({ bem }) => (
    <svg className="circular" viewBox="25 25 50 50">
      <circle cx="50" cy="50" r="20" fill="none" />
    </svg>
  );

  return <Tabs sticky>
    <Tabs.TabPane title="基本用法" onClick={() => setFinished(false)}>
      <MyList finished={finished} onLoad={onLoad}>
        {list.length
          ? list.map((_, item) => {
            return <div className="item" key={item}>{item}<CircularIcon /></div>;
          })
          : null}
      </MyList>
    </Tabs.TabPane>
    <Tabs.TabPane title="错误提示">
      <MyList finished={finished} errorText="请求失败，点击重新加载" onLoad={onLoadError}>
        {errorList.length
          ? errorList.map((_, i) => {
            return <Cell key={i} title={i + 1} />;
          })
          : null}
      </MyList>
    </Tabs.TabPane></Tabs>
}

export default Demo