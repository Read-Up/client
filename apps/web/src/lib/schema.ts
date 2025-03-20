import { z } from "zod";

const StringSchema = z.string();

const NumberSchema = z.number();

const NumericSchema = z.string().regex(/^\d+$/).transform(Number);

const EmailSchema = z.string().email();

const BirthSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const MobileSchema = z.string().regex(/^\d{3}-\d{3,4}-\d{4}$/);

const PhoneSchema = z.string().regex(/^\d{2,3}-\d{3,4}-\d{4}$/);

const IdSchema = z.string().regex(/^[a-zA-Z0-9]{4,20}$/);

const PasswordSchema = z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/);

const SexSchema = z.enum(["남", "여"]);

const ZipAddressSchema = z.string().length(5);

const BusinessNumberSchema = z.string().regex(/^(\d-?){9}\d$|^(\d-?){13}\d$/);

const EnumSchema = (type: [string, ...string[]]) => z.enum(type);

const AccountNumberSchema = z.string().regex(/^(?:\d+-?){10,13}\d$/);

const AmountSchema = z.preprocess((a) => parseInt(z.string().parse(a)), z.number());

// ! 공통 스키마

const OptionalSchema = {
  StringSchema,
  NumberSchema,
  EmailSchema,
  BirthSchema,
  MobileSchema,
  PhoneSchema,
  IdSchema,
  PasswordSchema,
  ZipAddressSchema,
  BusinessNumberSchema,
  EnumSchema,
  AccountNumberSchema,
  NumericSchema,
  AmountSchema,
  SexSchema,
};

export { OptionalSchema };
// export type { MemberSchemaType, SellerSchemaType, BulkLogRowSchemaType, BulkLogOrderSchemaType };
