export const ASSOCIATE_TYPES = [
  { value: "paciente", label: "Paciente" },
  { value: "responsavel", label: "Responsável" },
  { value: "profissional", label: "Profissional da saúde" },
] as const;

export const SEX_OPTIONS = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "outro", label: "Outro" },
  { value: "prefiro-nao-informar", label: "Prefiro não informar" },
] as const;

export const MARITAL_STATUS_OPTIONS = [
  { value: "solteiro", label: "Solteiro(a)" },
  { value: "casado", label: "Casado(a)" },
  { value: "divorciado", label: "Divorciado(a)" },
  { value: "viuvo", label: "Viúvo(a)" },
  { value: "uniao-estavel", label: "União estável" },
] as const;

export const BRAZILIAN_STATES = [
  { value: "AC", label: "AC" },
  { value: "AL", label: "AL" },
  { value: "AP", label: "AP" },
  { value: "AM", label: "AM" },
  { value: "BA", label: "BA" },
  { value: "CE", label: "CE" },
  { value: "DF", label: "DF" },
  { value: "ES", label: "ES" },
  { value: "GO", label: "GO" },
  { value: "MA", label: "MA" },
  { value: "MT", label: "MT" },
  { value: "MS", label: "MS" },
  { value: "MG", label: "MG" },
  { value: "PA", label: "PA" },
  { value: "PB", label: "PB" },
  { value: "PR", label: "PR" },
  { value: "PE", label: "PE" },
  { value: "PI", label: "PI" },
  { value: "RJ", label: "RJ" },
  { value: "RN", label: "RN" },
  { value: "RS", label: "RS" },
  { value: "RO", label: "RO" },
  { value: "RR", label: "RR" },
  { value: "SC", label: "SC" },
  { value: "SP", label: "SP" },
  { value: "SE", label: "SE" },
  { value: "TO", label: "TO" },
] as const;

export const REFERRAL_OPTIONS = [
  { value: "google", label: "Google / busca na internet" },
  { value: "indicacao-medico", label: "Indicação de médico" },
  { value: "indicacao-familiar", label: "Indicação de familiar ou amigo" },
  { value: "redes-sociais", label: "Redes sociais" },
  { value: "evento", label: "Evento ou palestra" },
  { value: "outro", label: "Outro" },
] as const;

export const PATHOLOGY_OPTIONS = [
  { value: "epilepsia", label: "Epilepsia" },
  { value: "dor-cronica", label: "Dor crônica" },
  { value: "ansiedade", label: "Ansiedade" },
  { value: "insonia", label: "Insônia" },
  { value: "cancer", label: "Câncer" },
  { value: "parkinson", label: "Parkinson" },
  { value: "esclerose-multipla", label: "Esclerose múltipla" },
  { value: "autismo", label: "Autismo (TEA)" },
  { value: "outra", label: "Outra" },
] as const;

export const FILE_ACCEPT = ".jpg,.jpeg,.pdf,image/jpeg,application/pdf";
export const FILE_HELP =
  "Arquivo em JPEG, JPG, PDF. Tamanho máximo de 2MB. O envio do arquivo será concluído em breve — por enquanto apenas os dados do cadastro são salvos.";
