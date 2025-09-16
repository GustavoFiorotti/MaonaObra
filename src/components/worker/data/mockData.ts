// Mock data para telas do profissional (baseado no João Silva)
export const workerProfile = {
  id: 1,
  name: "João Silva",
  specialty: "Alvenaria e Estruturas",
  category: "Alvenaria",
  rating: 4.8,
  reviews: 47,
  location: "São Paulo, SP",
  price: "R$ 80/dia",
  avatar: "https://images.unsplash.com/photo-1659353589552-1556f5093206?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTc3NDIwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  portfolio: [
    "https://images.unsplash.com/photo-1618832515490-e181c4794a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMGNvbnN0cnVjdGlvbiUyMHdvcmt8ZW58MXx8fHwxNzU3NzQyMDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1515588562968-3d1a385e4e4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNvbiUyMGJyaWNrbGF5ZXIlMjB3b3JrfGVufDF8fHx8MTc1Nzc0MjAzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1625337903959-5087244ce860?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmljayUyMHdhbGwlMjBjb25zdHJ1Y3Rpb24lMjB3b3JrfGVufDF8fHx8MTc1Nzc0OTE3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ]
};

// Agendamentos que o profissional recebe dos clientes
export const workerBookings = [
  {
    id: 1,
    client: {
      name: "Maria Silva",
      avatar: null,
      location: "São Paulo, SP"
    },
    date: "2025-09-17",
    time: "08:00",
    status: "pendente",
    service: "Construção de muro no quintal",
    description: "Preciso construir um muro de 20 metros para dividir o quintal. Material já está disponível no local.",
    price: "R$ 1.600"
  },
  {
    id: 2,
    client: {
      name: "José Santos",
      avatar: null,
      location: "São Paulo, SP"
    },
    date: "2025-09-20",
    time: "14:00",
    status: "confirmado",
    service: "Reforma da sala",
    description: "Renovar parede da sala com novo acabamento. Trabalho de médio porte.",
    price: "R$ 1.200"
  },
  {
    id: 3,
    client: {
      name: "Ana Costa",
      avatar: null,
      location: "São Paulo, SP"
    },
    date: "2025-09-25",
    time: "09:00",
    status: "confirmado",
    service: "Construção de churrasqueira",
    description: "Construir churrasqueira de alvenaria no quintal, projeto já definido.",
    price: "R$ 2.400"
  },
  {
    id: 4,
    client: {
      name: "Carlos Lima",
      avatar: null,
      location: "São Paulo, SP"
    },
    date: "2025-09-12",
    time: "08:00",
    status: "concluido",
    service: "Reparo em muro",
    description: "Conserto de muro danificado na lateral da casa.",
    price: "R$ 800"
  },
  {
    id: 5,
    client: {
      name: "Fernanda Oliveira",
      avatar: null,
      location: "São Paulo, SP"
    },
    date: "2025-09-10",
    time: "14:00",
    status: "concluido",
    service: "Construção de área de serviço",
    description: "Construção completa de área de serviço externa.",
    price: "R$ 3.200"
  }
];

// Conversas do profissional com clientes
export const workerMessages = {
  "Maria Silva": [
    {
      id: 1,
      sender: 'client',
      text: 'Olá! Gostaria de um orçamento para construir um muro no meu quintal.',
      time: '10:30'
    },
    {
      id: 2,
      sender: 'worker',
      text: 'Olá Maria! Claro, posso ajudar. Qual seria o tamanho aproximado do muro?',
      time: '10:35'
    },
    {
      id: 3,
      sender: 'client', 
      text: 'Preciso de 20 metros lineares, com altura de 2 metros.',
      time: '10:40'
    },
    {
      id: 4,
      sender: 'worker',
      text: 'Perfeito! Para esse tamanho, o orçamento fica em torno de R$ 1.600. Já tem o material?',
      time: '10:42'
    }
  ],
  "José Santos": [
    {
      id: 1,
      sender: 'client',
      text: 'Bom dia! Vi seu perfil e gostaria de conversar sobre uma reforma.',
      time: '08:15'
    },
    {
      id: 2,
      sender: 'worker',
      text: 'Bom dia José! Fico feliz pelo interesse. Me conte mais sobre o projeto.',
      time: '08:20'
    },
    {
      id: 3,
      sender: 'client',
      text: 'É uma reforma na parede da sala, precisa de acabamento novo.',
      time: '08:25'
    }
  ],
  "Ana Costa": [
    {
      id: 1,
      sender: 'client',
      text: 'Oi João! Preciso construir uma churrasqueira, você faz?',
      time: '16:00'
    },
    {
      id: 2,
      sender: 'worker',
      text: 'Oi Ana! Sim, faço churrasqueiras. Você já tem o projeto definido?',
      time: '16:05'
    },
    {
      id: 3,
      sender: 'client',
      text: 'Sim, tenho o projeto aqui. Posso te enviar as fotos?',
      time: '16:10'
    },
    {
      id: 4,
      sender: 'worker',
      text: 'Claro! Mande as fotos que faço o orçamento para você.',
      time: '16:12'
    }
  ]
};

// Estatísticas do profissional
export const workerStats = {
  monthlyEarnings: 5200,
  monthlyGrowth: 12,
  totalJobs: 23,
  completedJobs: 18,
  pendingJobs: 2,
  confirmedJobs: 3,
  averageRating: 4.8,
  totalReviews: 47,
  profileViews: 1240,
  responseRate: 95
};