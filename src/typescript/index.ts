type DigitRangeMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
type Digit = DigitRangeMap[number];

type ToDigit<T extends string> =
  T extends keyof DigitRangeMap
  ? DigitRangeMap[T]
  : never;

type ToDigitList<T, R extends any[] = []> =
  T extends `${infer First}${infer Rest}`
  ? ToDigitList<Rest, [ToDigit<First>, ...R]>
  : R;

// debug
type test = ToDigitList<"1234", [123, 123]>; // [4, 3, 2, 1]
const a: test = [4, 3, 2, 1, 123, 123]

export { }



class TestClass {

  constructor(
    public name: string,
    public age: number
  ) { }
}
type Classes = typeof TestClass



type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? [I] : never;

type Result = UnionToIntersection<string | number>; // string & number

type _Test = number & string

interface Module {
  count: number;
  message: string;
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
  syncMethod<T, U>(action: Action<T>): Action<U>;
}
interface Action<T> {
  payload?: T
  type: string
}

type FuncName<T> = {
  [P in keyof T]: T[P] extends Function ? P : never
}[keyof T]

type Connect = (mode: Module) => { [T in FuncName<Module>]: Module[T] }



