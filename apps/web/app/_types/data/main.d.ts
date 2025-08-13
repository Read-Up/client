interface UserData {
  id: number;
  nickname: string;
  imageUrl: string | null;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
  createdBy: string | null;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string;
  deletedAt: string | null;
  // accountSeq: number;
  // accountId: string;
  // name: string;
  // userTypeName: string;
  // eventGroupName: string;
  // eventGroupApproval: "APPROVAL" | "REQUEST" | "REJECT" | null;
  // eventGroupApprovalName: string;
  // partnershipGroupName: string;
  // requestEventGroupCode: string | null;
  // partnershipGroupApproval: "APPROVAL" | "REQUEST" | "REJECT" | null;
  // partnershipGroupApprovalName: string;
  // requestPartnershipGroupCode: string | null;
  // mobileNumber1: string;
  // mobileNumber2: string;
  // mobileNumber3: string;
  // membershipName: string;
  // emoney: number;
  // orderCount: number;
  // loginTypeName: string;
  // lastVisitDatetime: string;
  // registDatetime: string;
  // agreementSms: string;
  // agreementEmail: string;
  // email1: string;
  // email2: string;
}

interface MemberDTO {
  member: UserData; // 회원 정보
}
