export const navLinks = [
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Nossos Produtos", href: "/nossos-produtos" },
  { label: "Como Associar", href: "/como-associar" },
  { label: "FAQ", href: "/faq" },
] as const;

export const actionCards = [
  {
    label: "Quero me associar",
    href: "/como-associar",
    icon: "leaf" as const,
  },
  {
    label: "Quero associar meu pet",
    href: "/como-associar",
    icon: "paw" as const,
  },
  {
    label: "Sou associado",
    href: "/login",
    icon: "user" as const,
  },
  {
    label: "Sou profissional da saúde",
    href: "/login",
    icon: "stethoscope" as const,
  },
] as const;

export const benefits = [
  {
    title: "Ansiedade",
    description: "Ajuda o corpo a buscar o equilíbrio",
    icon: "cloud-lightning" as const,
  },
  {
    title: "Dores crônicas",
    description: "Atua como anti-inflamatório e analgésico natural",
    icon: "frown" as const,
  },
  {
    title: "Neuroproteção",
    description: "Protege o cérebro e alivia condições neurodegenerativas",
    icon: "brain" as const,
  },
  {
    title: "Insônia",
    description: "Induz naturalmente o relaxamento e o sono",
    icon: "moon" as const,
  },
] as const;

export const associationSteps = [
  { label: "Primeiro contato", arc: 90 },
  { label: "Consulta", arc: 140 },
  { label: "Documentos", arc: 200 },
  { label: "Ajuizamento", arc: 260 },
  { label: "Cadastro", arc: 310 },
  { label: "Pagamento", arc: 20 },
  { label: "Pedido", arc: 45 },
  { label: "Entregue", arc: 360, icon: "leaf" as const },
] as const;
