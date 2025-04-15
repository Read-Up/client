export type AgreementKey = "age" | "terms" | "privacy" | "marketing";

export interface AgreementItem {
  key: AgreementKey;
  label: string;
  required: boolean;
  detail?: string;
}

const AGREEMENT_ITEMS = [
  {
    key: "age",
    required: true,
    label: "(필수) 만 14세 이상입니다.",
    detail: "",
  },
  {
    key: "terms",
    required: true,
    label: "(필수) 서비스 이용약관",
    detail: `<서비스 이용약관>\n제 1 장 총칙\n\n제 1조 (목적)\n\n본 약관은 서비스(이하 "회사"라 한다)는 홈페이지에서 제공하는 서비스(이하 "서비스"라 한다)를 제공함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.\n\n제 2조 (용어의 정의)\n\n1. 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.`,
  },
  {
    key: "privacy",
    required: true,
    label: "(필수) 개인정보 수집 및 이용 동의",
    detail: ` 1. 개인정보의 수집 및 이용에 대한 동의\n\n가. 수집 및 이용 목적\n  o 한국저작권위원회에서 실시하는 기획혁신본부장 공모에 필요한 사항(응시원서 접수, 선발전형, 자격증빙 확인, 지원자의 시험성적 확인, 경력사항 증빙 등)에 대하여 외부공모 과정 진행을 위하여 필요한 최소한의 범위 내에서 개인정보를 수집하고 있습니다.\n\n나. 수집 및 이용 항목\n  1) 필수항목 : 성명(한글/한자/영문), 생년월일, 연락처, 전자우편, 주소, 병역사항, 증명사진, 경력사항, 자격증 취득여부`,
  },
  {
    key: "marketing",
    required: false,
    label: "(선택) 혜택 및 마케팅 정보 수신 동의",
    detail: `마케팅 정보 수신 동의에 대한 내용이 들어갈 예정입니다.`,
  },
] as const;

export default AGREEMENT_ITEMS;
