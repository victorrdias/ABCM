"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  FormFileInput,
  FormInput,
  FormSection,
  FormSelect,
  FormSelectPlaceholder,
  FormTextarea,
} from "@/components/ui/form-fields";
import { useRegisterMutation } from "@/hooks/use-register-mutation";
import {
  ASSOCIATE_TYPES,
  BRAZILIAN_STATES,
  FILE_ACCEPT,
  FILE_HELP,
  MARITAL_STATUS_OPTIONS,
  PATHOLOGY_OPTIONS,
  REFERRAL_OPTIONS,
  SEX_OPTIONS,
} from "@/lib/register/constants";
import {
  registerDefaultValues,
  registerSchema,
  type RegisterFormValues,
} from "@/lib/register/schema";

export function RegisterForm() {
  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const watchedFiles = watch([
    "patientDocument",
    "medicalPrescription",
    "residenceProof",
    "medicalReport",
    "responsibleDocument",
    "filingTerm",
  ]);

  const onSubmit = handleSubmit((values) => {
    registerMutation.mutate(values);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Associe-se
          </h1>
          <p className="mt-3 text-sm font-medium uppercase tracking-wide text-text-muted">
            Selecione um tipo de associado para prosseguir com o cadastro
          </p>
        </div>

        <FormSelect
          label="Tipo de Associado"
          required
          error={errors.associateType?.message}
          {...register("associateType")}
        >
          {ASSOCIATE_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FormSelect>

        <div className="mt-8 space-y-8">
          <FormSection title="Informações do Paciente">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormInput
                label="Nome do Paciente"
                required
                className="sm:col-span-2 lg:col-span-1"
                error={errors.patientName?.message}
                {...register("patientName")}
              />
              <FormInput
                label="Nome do médico"
                required
                error={errors.doctorName?.message}
                {...register("doctorName")}
              />
              <FormInput
                label="CRM/UF"
                required
                helpText="É o número do registro do médico e estado do registro. Essa informação geralmente está no carimbo do médico."
                error={errors.doctorCrmUf?.message}
                {...register("doctorCrmUf")}
              />
              <FormInput
                label="Data de Nascimento"
                required
                type="date"
                error={errors.birthDate?.message}
                {...register("birthDate")}
              />
              <FormSelect
                label="Sexo"
                required
                error={errors.sex?.message}
                {...register("sex")}
              >
                <FormSelectPlaceholder />
                {SEX_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
            </div>
          </FormSection>

          <FormSection title="Informações Pessoais">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormInput
                label="Nome do responsável"
                className="sm:col-span-2"
                error={errors.responsibleName?.message}
                {...register("responsibleName")}
              />
              <FormInput
                label="CPF"
                required
                error={errors.cpf?.message}
                {...register("cpf")}
              />
              <FormInput
                label="RG"
                error={errors.rg?.message}
                {...register("rg")}
              />
              <FormInput
                label="Órgão Expedidor RG"
                error={errors.rgIssuer?.message}
                {...register("rgIssuer")}
              />
              <FormSelect
                label="UF Órgão Expedidor RG"
                error={errors.rgIssuerState?.message}
                {...register("rgIssuerState")}
              >
                <FormSelectPlaceholder />
                {BRAZILIAN_STATES.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </FormSelect>
              <FormSelect
                label="Estado Civil"
                error={errors.maritalStatus?.message}
                {...register("maritalStatus")}
              >
                <FormSelectPlaceholder />
                {MARITAL_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
              <FormInput
                label="Profissão"
                error={errors.profession?.message}
                {...register("profession")}
              />
              <FormSelect
                label="UF Nascimento"
                error={errors.birthState?.message}
                {...register("birthState")}
              >
                <FormSelectPlaceholder />
                {BRAZILIAN_STATES.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </FormSelect>
              <FormInput
                label="Cidade Nascimento"
                error={errors.birthCity?.message}
                {...register("birthCity")}
              />
              <FormInput
                label="Qual o plano de saúde?"
                className="sm:col-span-2 lg:col-span-3"
                helpText={'Caso não tenha plano, escreva "SUS"'}
                error={errors.healthPlan?.message}
                {...register("healthPlan")}
              />
            </div>
          </FormSection>

          <FormSection title="Documentação">
            <p className="mb-4 rounded-lg bg-brand-green-light px-4 py-3 text-sm text-brand-blue">
              O upload de documentos será habilitado em breve. Você pode
              selecionar os arquivos agora; por enquanto, o cadastro salva seus
              dados no Firestore.
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              <FormFileInput
                label="Documento Pessoal do Paciente"
                accept={FILE_ACCEPT}
                helpText={FILE_HELP}
                fileName={watchedFiles[0]?.name}
                error={errors.patientDocument?.message as string | undefined}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setValue("patientDocument", file ?? null, { shouldValidate: true });
                }}
              />
              <FormFileInput
                label="Receita Médica"
                accept={FILE_ACCEPT}
                helpText={FILE_HELP}
                fileName={watchedFiles[1]?.name}
                error={errors.medicalPrescription?.message as string | undefined}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setValue("medicalPrescription", file ?? null, { shouldValidate: true });
                }}
              />
              <FormFileInput
                label="Comprovante de residência (3 meses)"
                accept={FILE_ACCEPT}
                helpText={FILE_HELP}
                fileName={watchedFiles[2]?.name}
                error={errors.residenceProof?.message as string | undefined}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setValue("residenceProof", file ?? null, { shouldValidate: true });
                }}
              />
              <FormFileInput
                label="Laudo Médico"
                accept={FILE_ACCEPT}
                helpText={FILE_HELP}
                fileName={watchedFiles[3]?.name}
                error={errors.medicalReport?.message as string | undefined}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setValue("medicalReport", file ?? null, { shouldValidate: true });
                }}
              />
              <FormFileInput
                label="Documento Pessoal do Responsável"
                accept={FILE_ACCEPT}
                helpText={FILE_HELP}
                fileName={watchedFiles[4]?.name ?? undefined}
                error={errors.responsibleDocument?.message as string | undefined}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setValue("responsibleDocument", file ?? null, { shouldValidate: true });
                }}
              />
              <FormFileInput
                label="Termo de Ajuizamento"
                accept={FILE_ACCEPT}
                helpText={FILE_HELP}
                fileName={watchedFiles[5]?.name}
                error={errors.filingTerm?.message as string | undefined}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setValue("filingTerm", file ?? null, { shouldValidate: true });
                }}
              />
            </div>
            <a
              href="#"
              className="mt-4 inline-flex rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              onClick={(event) => event.preventDefault()}
            >
              Baixar Termo de Ajuizamento
            </a>
          </FormSection>

          <FormSection title="Endereço Residencial">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FormInput
                label="CEP"
                required
                error={errors.zipCode?.message}
                {...register("zipCode")}
              />
              <FormInput
                label="Logradouro"
                required
                className="sm:col-span-2 lg:col-span-2"
                error={errors.street?.message}
                {...register("street")}
              />
              <FormInput
                label="Número"
                required
                error={errors.number?.message}
                {...register("number")}
              />
              <FormInput
                label="Bairro"
                required
                className="sm:col-span-2"
                error={errors.neighborhood?.message}
                {...register("neighborhood")}
              />
              <FormInput
                label="Complemento"
                error={errors.complement?.message}
                {...register("complement")}
              />
              <FormSelect
                label="UF"
                required
                error={errors.addressState?.message}
                {...register("addressState")}
              >
                <FormSelectPlaceholder />
                {BRAZILIAN_STATES.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </FormSelect>
              <FormInput
                label="Cidade"
                required
                error={errors.city?.message}
                {...register("city")}
              />
            </div>
          </FormSection>

          <div className="grid gap-8 lg:grid-cols-2">
            <FormSection title="Acesso Área do Associado">
              <div className="grid gap-4">
                <FormInput
                  label="Login (e-mail)"
                  required
                  type="email"
                  autoComplete="email"
                  helpText="Use seu e-mail como login de acesso"
                  error={errors.login?.message}
                  {...register("login")}
                />
                <FormInput
                  label="Senha"
                  required
                  type="password"
                  autoComplete="new-password"
                  error={errors.password?.message}
                  {...register("password")}
                />
                <FormInput
                  label="Confirmar Senha"
                  required
                  type="password"
                  autoComplete="new-password"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
              </div>
            </FormSection>

            <FormSection title="Outras Informações">
              <FormSelect
                label="Como Conheceu a Associação"
                error={errors.referralSource?.message}
                {...register("referralSource")}
              >
                <FormSelectPlaceholder />
                {REFERRAL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
            </FormSection>
          </div>

          <FormSection title="Patologias">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="mb-6 grid gap-4 border-b border-slate-100 pb-6 last:mb-0 last:border-b-0 last:pb-0 lg:grid-cols-3"
              >
                <FormSelect
                  label={`Patologia ${index + 1}`}
                  required={index === 0}
                  helpText={index === 0 ? "Selecione uma patologia" : undefined}
                  error={errors.pathologies?.[index]?.pathology?.message}
                  {...register(`pathologies.${index}.pathology`)}
                >
                  <FormSelectPlaceholder />
                  {PATHOLOGY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormSelect>
                <FormInput
                  label="Ano de Diagnóstico"
                  helpText="Digite apenas o ano (Ex: 2000)"
                  error={errors.pathologies?.[index]?.diagnosisYear?.message}
                  {...register(`pathologies.${index}.diagnosisYear`)}
                />
                <FormTextarea
                  label="Sintomas"
                  helpText="Máximo de 500 caracteres"
                  error={errors.pathologies?.[index]?.symptoms?.message}
                  {...register(`pathologies.${index}.symptoms`)}
                />
              </div>
            ))}
          </FormSection>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="space-y-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue/20"
              {...register("acceptPrivacyPolicy")}
            />
            <span className="text-sm text-text-muted">
              Li e concordo com a{" "}
              <Link
                href="/politica-de-privacidade"
                target="_blank"
                className="font-medium text-brand-blue hover:underline"
              >
                Política de Privacidade
              </Link>
              .
            </span>
          </label>
          {errors.acceptPrivacyPolicy?.message && (
            <p className="text-xs text-red-600">
              {errors.acceptPrivacyPolicy.message}
            </p>
          )}

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue/20"
              {...register("acceptSensitiveDataProcessing")}
            />
            <span className="text-sm text-text-muted">
              Autorizo o tratamento dos meus dados pessoais sensíveis,
              incluindo dados de saúde, para fins de associação e
              acompanhamento do tratamento, conforme a LGPD.
            </span>
          </label>
          {errors.acceptSensitiveDataProcessing?.message && (
            <p className="text-xs text-red-600">
              {errors.acceptSensitiveDataProcessing.message}
            </p>
          )}
        </div>

        {registerMutation.error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {registerMutation.error.message}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">
            Já possui conta?{" "}
            <Link href="/login" className="font-medium text-brand-blue hover:underline">
              Entrar
            </Link>
          </p>
          <button
            type="submit"
            disabled={isSubmitting || registerMutation.isPending}
            className="inline-flex items-center justify-center rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {registerMutation.isPending ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </form>
  );
}
