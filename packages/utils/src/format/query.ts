export function parseQueryToObj<T extends Record<string, string>>(
  obj: T,
  arraryKey: string = "|",
): { [K in keyof T]: string | string[] } {
  const newQuery = structuredClone(obj) as { [K in keyof T]: string | string[] };

  (Object.keys(newQuery) as (keyof T)[]).forEach((key) => {
    if (typeof newQuery[key] === "string" && newQuery[key].includes(arraryKey)) {
      newQuery[key] = newQuery[key].split(arraryKey);
    }
  });

  return newQuery;
}

export function deleteEmptyObj<T extends Record<string, unknown>>(obj: T, strType: string = "ALL"): Partial<T> {
  // cloneObj는 각 프로퍼티가 선택적인 mapped type으로 선언합니다.
  const cloneObj = structuredClone(obj) as { [K in keyof T]?: T[K] };

  (Object.keys(cloneObj) as (keyof T)[]).forEach((key) => {
    const value = cloneObj[key];

    // falsy 값이면 해당 키를 삭제합니다.
    if (!value) {
      delete cloneObj[key];
      return;
    }

    // 배열인 경우: 모든 요소가 falsy이거나 "ALL" (대문자)와 일치하면 삭제합니다.
    if (Array.isArray(value)) {
      const isEmpty = (value as unknown[]).every((item) => !item || item.toString().toUpperCase() === "ALL");
      if (isEmpty) {
        delete cloneObj[key];
      }
      return;
    }

    // 객체인 경우 (null과 배열은 제외): 재귀적으로 처리합니다.
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      cloneObj[key] = deleteEmptyObj(value as Record<string, unknown>, strType) as T[typeof key];
      return;
    }

    // 값이 지정한 문자열(strType)과 일치하면 삭제합니다.
    if (value.toString().toUpperCase() === strType) {
      delete cloneObj[key];
      return;
    }
  });

  return cloneObj;
}

export function delEmptyArrParams<T extends Record<string, string>>(searchParmas?: T, arrType = "|") {
  if (!searchParmas) return searchParmas;

  const copyData = structuredClone(searchParmas);

  const condition = copyData && Object.keys(copyData).some((item) => copyData[item]?.includes(arrType));

  if (!condition) return copyData;

  for (const key in copyData) {
    if (copyData[key]?.includes(arrType)) {
      copyData[key] = copyData[key]
        ?.split(arrType)
        .filter((item) => item)
        .join(arrType) as T[Extract<keyof T, string>];
    }
  }

  return copyData;
}

export function mergeQuery<T extends Record<string, unknown>>(defaultValue: T, query: Partial<T>) {
  return {
    ...structuredClone(defaultValue),
    ...structuredClone(query),
  };
}

export function StrToArrWithForm<T extends string[]>(str: string, arr: T, arrType = "|") {
  if (!str) return arr.map(() => "");

  const parseStr = str.split(arrType);
  const new_form_arr = arr.map((item) => (parseStr.includes(item) ? item : ""));

  return new_form_arr;
}
