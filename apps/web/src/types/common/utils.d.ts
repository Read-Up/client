// ! 백엔드에서 내려주는 데이터 구조를 정의하고 제네릭으로 dto 타입을 받습니다
interface ResJson<Tdata> {
  data: Tdata;
  message: string;
  statusCode: string;
}

// ! 페이지네이션 되어있는 데이터에 사용하시면 됩니다
interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

type PaginationList<T> = {
  pagination: Pagination;
} & T;

// ! 기본적으로 쓸만한 유틸타입들 정의 하였습니다 react setState등 타입 매번 만들지 말고 사용하시면 됩니다

// ----------------------------------------------------------------------
// ! object type

type Obj = Record<string, unknown>;

type NullRecord<K extends Obj> = Record<keyof K, K[keyof K] extends Obj ? NullRecord<K[keyof K]> : K[keyof K] | null>;

type ValueOf<T> = T extends Obj ? T[keyof T] : unknown;

type KeyOf<T> = T extends Obj ? keyof T : unknown;

type ValueOfKey<T, K extends keyof T> = T[K];

type ObjKeyToArr<T extends Obj> = { [K in number]: keyof T };

// ----------------------------------------------------------------------
// ! array type

type ArrayToUnion<A extends any[]> = A[number];
// ArrayObjToUnion<A, 'accessorKey'> = 'A' | 'B' | 'C' | 'D'
type ArrayObjToUnion<A extends Record<string, any>[], K extends string> = A[number][K];
// ArrayToObject<B> = { a: 'a', b: 'b', c: 'c', d: 'd' }
type ArrayToObject<V extends Array<string | number>> = { [K in V[number]]: string };

// ----------------------------------------------------------------------
// ! union type

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never;

type Push<T extends any[], V> = [...T, V];

type UnionToTuple<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N
  ? []
  : Push<TuplifyUnion<Exclude<T, L>>, L>;

// type UnionToTuple<U> = U extends any ? (U extends infer I ? I[] : never) : never;

type UnionToObj<U extends string> = { [K in U]: K };

// ----------------------------------------------------------------------
// ! react type

type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;

type GetComponentProps<T> = T extends React.ComponentType<infer P> | React.Component<infer P> ? P : never;

// ----------------------------------------------------------------------
// ! function type

// type Parameter<T> = T extends Function ? Parameters<T> : never;

// type Return<T> = T extends Function ? ReturnType<T> : never;

// type Parameter<T> = T extends (param: infer U) => any ? U : never;
