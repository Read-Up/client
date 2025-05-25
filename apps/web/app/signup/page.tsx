import { END_POINT } from "@/_constant/end-point";
import { agreementsResponseSchema } from "./_types";
import SignupScreen from "./screen";
import { BaseApi } from '@/_client/main/instance';

// 지금 -> 회원이 페이지를 실행할 때마다 약관을 가져오는 것. 
// 이후 -> 서버 빌드할 때 한번 가져오고 static html 파일로 만들어서 제공하는 것.
export default async function Signup() {
  const fetchAgreements = async () => {
    try {
      const response = await BaseApi.get(END_POINT.SIGNUP.TERMS).json();

      const parsed = agreementsResponseSchema.parse(response);

      if (!parsed.success) {
        throw new Error("서버 응답 실패");
      }
      console.log("parsed.data", parsed.data);

      return parsed.data;
    } catch (error) {
      console.error("약관 정보 불러오기 실패", error);

      return [];
    }
  }

  const agreements = await fetchAgreements();

  return <SignupScreen agreements={agreements} />;
}
