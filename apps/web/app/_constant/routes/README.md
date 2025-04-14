```markdown
# 📁 routes

프론트엔드 내 라우팅과 관련된 **경로(path)** 및 **라우트 정보(route metadata)**를 정의한 상수 모듈입니다. 이 디렉토리는 각 페이지의 URL 구조와 화면 이름을 일관성 있게 관리하기 위해 사용됩니다.

---

## 📌 구조

```
routes/
├── index.ts      # PATH, ROUTER를 통합 export
├── path.ts       # 실제 URL 경로를 정의
└── routes.ts     # 페이지 이름(name) + URL을 포함한 라우터 정보
```

---

## 📄 파일 설명

### `path.ts`
- 실제 URL path 문자열을 정의합니다.
- 페이지/도메인 단위로 구성되며, `ROOTS` 기반으로 확장됩니다.
- `Object.freeze()`로 불변성을 유지합니다.
- 예:
  ```ts
  PATH.BOOK.SEARCH // "/book/search"
  ```

### `routes.ts`
- 사용자에게 노출될 **페이지 이름(name)** 과 URL 정보를 함께 정의합니다.
- Breadcrumb, 화면 헤더, 사이드바 메뉴 구성 등에 활용 가능합니다.
- 예:
  ```ts
  ROUTER.MYPAGE.DEFAULT // { name: "마이페이지", url: "/mypage" }
  ```

### `index.ts`
- `PATH`와 `ROUTER`를 외부에서 편리하게 import할 수 있도록 통합 export 합니다.
- 예:
  ```ts
  import { PATH, ROUTER } from "@/constant/routes";
  ```

---

## 🧩 사용 예시

### 📍 `next/link` 사용 시
```tsx
import Link from "next/link";
import { PATH } from "@/constant/routes";

<Link href={PATH.BOOK.SEARCH}>도서 검색</Link>
```

### 📍 화면 제목 출력 시
```tsx
import { ROUTER } from "@/constant/routes";

<h1>{ROUTER.BOOK.SEARCH.name}</h1>  // "도서/검색"
```

---

## 🛠 개발 가이드

- **경로 추가 시**: `path.ts`에 먼저 정의하고, 필요 시 `routes.ts`에 이름을 추가합니다.
- **경로 수정 시**: 실제 URL 변경은 `path.ts`에서만, 화면 이름은 `routes.ts`에서만 수정하세요.
- **일관된 네이밍을 유지**해주세요 (`ROOT`, `SEARCH`, `DETAIL`, `DEFAULT` 등).

---

## 🙌 목적

- **경로 하드코딩 방지**: `"/mypage"` 등의 하드코딩을 방지하고 경로 관리 일원화
- **유지보수 용이**: URL 구조 변경 시 한 곳만 수정하면 전체 반영 가능

```