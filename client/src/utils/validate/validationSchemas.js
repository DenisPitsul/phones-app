import * as yup from 'yup';

const PHONE_MODEL_VALIDATION_SCHEMA = yup.string().trim().min(1);
const PHONE_MANUFACTURED_YEAR_VALIDATION_SCHEMA = yup
  .number()
  .min(1970)
  .max(new Date().getFullYear());
const PHONE_RAM_VALIDATION_SCHEMA = yup.number().min(1);
const PHONE_CPU_VALIDATION_SCHEMA = yup.string().trim().min(1);
const PHONE_SCREEN_SIZE_VALIDATION_SCHEMA = yup.number().min(0.1);
const PHONE_HAS_HFC_VALIDATION_SCHEMA = yup.boolean();
const PHONE_BRAND_ID_VALIDATION_SCHEMA = yup.number().min(1);

export const CREATE_PHONE_VALIDATION_SCHEMA = yup.object({
  model: PHONE_MODEL_VALIDATION_SCHEMA.required(),
  manufacturedYear: PHONE_MANUFACTURED_YEAR_VALIDATION_SCHEMA.required(),
  ram: PHONE_RAM_VALIDATION_SCHEMA.required(),
  cpu: PHONE_CPU_VALIDATION_SCHEMA.required(),
  screenSize: PHONE_SCREEN_SIZE_VALIDATION_SCHEMA.required(),
  hasNfc: PHONE_HAS_HFC_VALIDATION_SCHEMA,
  brandId: PHONE_BRAND_ID_VALIDATION_SCHEMA.required(),
});

export const UPDATE_PHONE_VALIDATION_SCHEMA = yup.object({
  model: PHONE_MODEL_VALIDATION_SCHEMA,
  manufacturedYear: PHONE_MANUFACTURED_YEAR_VALIDATION_SCHEMA,
  ram: PHONE_RAM_VALIDATION_SCHEMA,
  cpu: PHONE_CPU_VALIDATION_SCHEMA,
  screenSize: PHONE_SCREEN_SIZE_VALIDATION_SCHEMA,
  hasNfc: PHONE_HAS_HFC_VALIDATION_SCHEMA,
  brandId: PHONE_BRAND_ID_VALIDATION_SCHEMA,
});
