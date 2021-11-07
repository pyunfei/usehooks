import { useEffect, useMemo, useState } from "react";

const List = () => {
  const data = [
    { name: "John", age: 30, children: [{ name: "Mary", age: 5 }] },
    { name: "Peter", age: 31, children: [{ name: "Paul", age: 3 }] },
    { name: "Amy", age: 32, children: [] },
  ]
  const [time, setTime] = useState<number>(1)

  useEffect(() => {
    const timer = setInterval(() => setTime(ti => ti + 1), 1000)
    return () => clearInterval(timer)
  }, [time])

  const memoData = useMemo(() => {
    return data.map(item => ({ ...item, age: item.age + time }))
  }, [time])

  return (
    <div>
      {
        memoData.map((item: any, index: number) => {
          if (!item.name) {
            return null;
          }
          return <div>
            <div key={index}>{item.name} ---- {item.age}</div>
            {
              item.children.map((item: any) => item.name)
            }
          </div>;
        })
      }
    </div>
  );
}

export default List;