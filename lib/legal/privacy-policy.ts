import {
  DATA_CONTROLLER_NAME,
  DATA_PROTECTION_CONTACT_EMAIL,
  PRIVACY_POLICY_EFFECTIVE_DATE,
  PRIVACY_POLICY_VERSION,
} from "./constants";

export const privacyPolicyMeta = {
  version: PRIVACY_POLICY_VERSION,
  effectiveDate: PRIVACY_POLICY_EFFECTIVE_DATE,
  controller: DATA_CONTROLLER_NAME,
  contactEmail: DATA_PROTECTION_CONTACT_EMAIL,
} as const;

export const privacyPolicySections = [
  {
    title: "1. Quem somos",
    paragraphs: [
      `Esta Política de Privacidade descreve como a ${DATA_CONTROLLER_NAME} coleta, usa, armazena e protege dados pessoais no site e nos serviços de associação.`,
      "Ao se cadastrar, você declara ter lido e compreendido este documento.",
    ],
  },
  {
    title: "2. Dados que coletamos",
    paragraphs: [
      "Podemos tratar os seguintes dados, conforme o formulário de cadastro:",
    ],
    list: [
      "Dados de identificação: nome, CPF, RG, data de nascimento, sexo e documentos;",
      "Dados de contato: e-mail, endereço e telefone;",
      "Dados de saúde: patologias, sintomas, receitas, laudos e informações médicas;",
      "Dados de acesso: login, registros de autenticação e logs de uso da área do associado.",
    ],
  },
  {
    title: "3. Finalidade e base legal",
    paragraphs: [
      "Utilizamos seus dados para viabilizar a associação, orientar o processo de acesso ao tratamento, cumprir obrigações legais e prestar suporte ao associado.",
      "O tratamento de dados pessoais sensíveis, incluindo dados de saúde, ocorre com base no seu consentimento específico e destacado, nos termos da LGPD (Lei nº 13.709/2018).",
    ],
  },
  {
    title: "4. Compartilhamento",
    paragraphs: [
      "Não vendemos seus dados. O compartilhamento ocorre apenas quando necessário para a operação do serviço, cumprimento legal ou com seu consentimento, incluindo provedores de infraestrutura (como Firebase/Google Cloud) sob contratos de proteção de dados.",
    ],
  },
  {
    title: "5. Armazenamento e retenção",
    paragraphs: [
      "Os dados são armazenados em ambiente controlado com medidas técnicas e administrativas de segurança.",
      "Mantemos os dados enquanto durar a relação associativa e pelo prazo necessário para cumprimento de obrigações legais, regulatórias e exercício regular de direitos.",
      "Após esse período, os dados serão eliminados ou anonimizados, salvo hipótese legal de retenção.",
    ],
  },
  {
    title: "6. Seus direitos",
    paragraphs: [
      "Você pode solicitar, a qualquer momento:",
    ],
    list: [
      "Confirmação da existência de tratamento e acesso aos dados;",
      "Correção de dados incompletos, inexatos ou desatualizados;",
      "Anonimização, bloqueio ou eliminação de dados desnecessários;",
      "Portabilidade e informação sobre compartilhamentos;",
      "Revogação do consentimento, quando aplicável.",
    ],
    footer:
      `Para exercer seus direitos, envie e-mail para ${DATA_PROTECTION_CONTACT_EMAIL}.`,
  },
  {
    title: "7. Segurança",
    paragraphs: [
      "Adotamos autenticação segura, cookies de sessão HttpOnly, controle de acesso por usuário e boas práticas de desenvolvimento. Nenhum sistema é 100% imune a riscos, mas trabalhamos continuamente para reduzir vulnerabilidades.",
    ],
  },
  {
    title: "8. Atualizações",
    paragraphs: [
      `Esta política pode ser atualizada. A versão vigente é ${PRIVACY_POLICY_VERSION}, com vigência a partir de ${PRIVACY_POLICY_EFFECTIVE_DATE}. Alterações relevantes serão comunicadas pelos canais oficiais da associação.`,
    ],
  },
] as const;
