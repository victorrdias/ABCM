import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "application/pdf",
];

function optionalFile() {
  return z
    .union([z.instanceof(File), z.null()])
    .nullable()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Tamanho máximo de 2MB",
    )
    .refine(
      (file) =>
        !file || ACCEPTED_FILE_TYPES.includes(file.type),
      "Apenas JPEG, JPG ou PDF",
    );
}

const pathologySchema = z.object({
  pathology: z.string().optional(),
  diagnosisYear: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^\d{4}$/.test(value),
      "Digite apenas o ano (Ex: 2000)",
    ),
  symptoms: z
    .string()
    .max(500, "Máximo de 500 caracteres")
    .optional(),
});

export const registerSchema = z
  .object({
    associateType: z.string().min(1, "Selecione o tipo de associado"),
    patientName: z.string().min(1, "Nome do paciente é obrigatório"),
    doctorName: z.string().min(1, "Nome do médico é obrigatório"),
    doctorCrmUf: z.string().min(1, "CRM/UF é obrigatório"),
    birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
    sex: z.string().min(1, "Selecione o sexo"),
    responsibleName: z.string().optional(),
    cpf: z.string().min(11, "CPF inválido"),
    rg: z.string().optional(),
    rgIssuer: z.string().optional(),
    rgIssuerState: z.string().optional(),
    maritalStatus: z.string().optional(),
    profession: z.string().optional(),
    birthState: z.string().optional(),
    birthCity: z.string().optional(),
    healthPlan: z.string().optional(),
    patientDocument: optionalFile(),
    medicalPrescription: optionalFile(),
    residenceProof: optionalFile(),
    medicalReport: optionalFile(),
    responsibleDocument: optionalFile(),
    filingTerm: optionalFile(),
    zipCode: z.string().min(8, "CEP inválido"),
    street: z.string().min(1, "Logradouro é obrigatório"),
    number: z.string().min(1, "Número é obrigatório"),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    complement: z.string().optional(),
    addressState: z.string().min(1, "UF é obrigatória"),
    city: z.string().min(1, "Cidade é obrigatória"),
    login: z.string().email("Informe um e-mail válido para login"),
    password: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirme a senha"),
    referralSource: z.string().optional(),
    pathologies: z.array(pathologySchema).length(3),
    acceptPrivacyPolicy: z.boolean().refine((value) => value, {
      message: "Você precisa aceitar a política de privacidade",
    }),
    acceptSensitiveDataProcessing: z.boolean().refine((value) => value, {
      message:
        "É necessário autorizar o tratamento de dados sensíveis de saúde",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
  .refine((data) => data.pathologies[0]?.pathology, {
    message: "Selecione uma patologia",
    path: ["pathologies", 0, "pathology"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const registerDefaultValues = {
  associateType: "paciente",
  patientName: "",
  doctorName: "",
  doctorCrmUf: "",
  birthDate: "",
  sex: "",
  responsibleName: "",
  cpf: "",
  rg: "",
  rgIssuer: "",
  rgIssuerState: "",
  maritalStatus: "",
  profession: "",
  birthState: "",
  birthCity: "",
  healthPlan: "",
  patientDocument: null,
  medicalPrescription: null,
  residenceProof: null,
  medicalReport: null,
  responsibleDocument: null,
  filingTerm: null,
  zipCode: "",
  street: "",
  number: "",
  neighborhood: "",
  complement: "",
  addressState: "",
  city: "",
  login: "",
  password: "",
  confirmPassword: "",
  referralSource: "",
  pathologies: [
    { pathology: "", diagnosisYear: "", symptoms: "" },
    { pathology: "", diagnosisYear: "", symptoms: "" },
    { pathology: "", diagnosisYear: "", symptoms: "" },
  ],
  acceptPrivacyPolicy: false,
  acceptSensitiveDataProcessing: false,
} satisfies Partial<RegisterFormValues>;
