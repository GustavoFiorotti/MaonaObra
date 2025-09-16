import React, { useState, useMemo, useCallback } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Search,
  Star,
  MapPin,
  Phone,
  Clock,
  Calendar as CalendarIcon,
  ArrowLeft,
  User,
  Settings,
  Hammer,
  Home as HomeIcon,
  Paintbrush,
  Zap,
  Square,
  MessageCircle,
  Camera,
  ChevronRight,
  Plus,
  Send,
  Check,
  CheckCheck,
  Filter,
  X,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  mockWorkers,
  categories,
  mockBookings,
  mockReviews,
} from "./data/mockData";

interface ClientAppProps {
  currentScreen: string;
  onNavigate: (screen: string, data?: any) => void;
  onGoBack: () => void;
}

export function ClientApp({
  currentScreen,
  onNavigate,
  onGoBack,
}: ClientAppProps) {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [messages, setMessages] = useState({
    1: [
      // Apenas João Silva terá mensagens
      {
        id: 1,
        sender: "worker",
        text: "Olá! Vi seu interesse no meu trabalho. Em que posso ajudar?",
        time: "14:32",
      },
      {
        id: 2,
        sender: "client",
        text: "Oi! Preciso de um orçamento para construir um muro no meu quintal.",
        time: "14:35",
      },
      {
        id: 3,
        sender: "worker",
        text: "Perfeito! Você pode me enviar algumas fotos do local? Assim consigo dar um orçamento mais preciso.",
        time: "14:37",
      },
    ],
  });

  const handleNavigate = useCallback(
    (screen: string, data?: any) => {
      if (data) setSelectedWorker(data);
      onNavigate(screen, data);
    },
    [onNavigate]
  );

  const addMessage = useCallback((workerId: number, text: string) => {
    if (workerId !== 1) return; // Apenas João Silva pode receber mensagens

    const newMessage = {
      id: Date.now(),
      sender: "client",
      text: text,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => ({
      ...prev,
      [workerId]: [...(prev[workerId] || []), newMessage],
    }));
  }, []);

  const locations = useMemo(
    () => [...new Set(mockWorkers.map((worker) => worker.location))].sort(),
    []
  );

  const filteredWorkers = useMemo(() => {
    let filtered = [...mockWorkers];

    if (selectedCategory) {
      filtered = filtered.filter(
        (worker) => worker.category === selectedCategory
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(
        (worker) => worker.location === selectedLocation
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((worker) =>
        worker.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }

    return filtered;
  }, [selectedCategory, selectedLocation, searchQuery]);

  // Profissionais em destaque sempre mostram os primeiros 3 sem filtro
  const featuredWorkers = useMemo(() => {
    let featured = [...mockWorkers];

    if (searchQuery.trim()) {
      featured = featured.filter((worker) =>
        worker.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }

    return featured.slice(0, 3);
  }, [searchQuery]);

  const BottomNavigation = useMemo(
    () => (
      <div
        className="fixed bottom-0 left-1/2 translate-x-[-50%] bg-white border-t border-gray-200 px-4 py-2"
        style={{ width: 393 }}
      >
        <div className="flex justify-around items-center w-full">
          <Button
            variant={currentScreen === "home" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavigate("home")}
            className={`flex-col h-auto py-2 ${
              currentScreen === "home"
                ? "bg-orange-600 text-white"
                : "text-gray-600"
            }`}
          >
            <HomeIcon className="w-5 h-5 mb-1" />
            <span className="text-xs">Home</span>
          </Button>

          <Button
            variant={currentScreen === "search" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavigate("search")}
            className={`flex-col h-auto py-2 ${
              currentScreen === "search"
                ? "bg-orange-600 text-white"
                : "text-gray-600"
            }`}
          >
            <Search className="w-5 h-5 mb-1" />
            <span className="text-xs">Buscar</span>
          </Button>

          <Button
            variant={currentScreen === "bookings" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavigate("bookings")}
            className={`flex-col h-auto py-2 ${
              currentScreen === "bookings"
                ? "bg-orange-600 text-white"
                : "text-gray-600"
            }`}
          >
            <CalendarIcon className="w-5 h-5 mb-1" />
            <span className="text-xs">Agendamentos</span>
          </Button>

          <Button
            variant={currentScreen === "account" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavigate("account")}
            className={`flex-col h-auto py-2 ${
              currentScreen === "account"
                ? "bg-orange-600 text-white"
                : "text-gray-600"
            }`}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">Minha Conta</span>
          </Button>
        </div>
      </div>
    ),
    [currentScreen, handleNavigate]
  );

  // Home Screen
  if (currentScreen === "home") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Olá, Renan!</h1>
              <p className="text-gray-600">
                Que serviço você precisa para hoje?
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6 pb-20">
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Categorias</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                    selectedCategory === category.name
                      ? "ring-2 ring-orange-500"
                      : ""
                  }`}
                  onClick={() => {
                    const newCategory =
                      selectedCategory === category.name ? "" : category.name;
                    setSelectedCategory(newCategory);
                    handleNavigate("search");
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-2`}
                    >
                      {category.icon === "Hammer" && (
                        <Hammer className="w-6 h-6 text-white" />
                      )}
                      {category.icon === "Paintbrush" && (
                        <Paintbrush className="w-6 h-6 text-white" />
                      )}
                      {category.icon === "Zap" && (
                        <Zap className="w-6 h-6 text-white" />
                      )}
                      {category.icon === "Square" && (
                        <Square className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Workers */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">
                Profissionais em Destaque
              </h3>
            </div>

            <div className="space-y-3">
              {featuredWorkers.map((worker) => (
                <Card
                  key={worker.id}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleNavigate("worker-profile", worker)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={worker.avatar} />
                        <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {worker.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {worker.specialty}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">
                              {worker.rating}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">
                              ({worker.reviews})
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {worker.price}
                          </Badge>
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        {BottomNavigation}
      </div>
    );
  }

  // Worker Profile Screen
  if (
    currentScreen === "worker-profile" &&
    selectedWorker &&
    selectedWorker.portfolio
  ) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="flex items-center p-4">
            <Button variant="ghost" size="icon" onClick={onGoBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h2 className="ml-4 text-xl font-semibold">
              Perfil do Profissional
            </h2>
          </div>

          {/* Profile Header */}
          <div className="p-4 text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={selectedWorker.avatar} />
              <AvatarFallback className="text-2xl">
                {selectedWorker.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <h3 className="text-2xl font-bold text-gray-900">
              {selectedWorker.name}
            </h3>
            <p className="text-gray-600 mb-2">{selectedWorker.specialty}</p>

            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold ml-1">
                  {selectedWorker.rating}
                </span>
                <span className="text-gray-500 ml-1">
                  ({selectedWorker.reviews} avaliações)
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => handleNavigate("booking")}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Agendar Serviço
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-xl"
                onClick={() => handleNavigate("chat")}
              >
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="p-4">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
              <TabsTrigger value="services">Serviços</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {selectedWorker?.portfolio?.length > 0 ? (
                  selectedWorker.portfolio.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl overflow-hidden bg-gray-200"
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`Trabalho ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-gray-500">
                    <Camera className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Nenhuma imagem de portfólio disponível.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-3">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Alvenaria Estrutural
                  </h4>
                  <p className="text-gray-600 mb-2">
                    Construção de paredes, muros e estruturas
                  </p>
                  <Badge className="bg-green-100 text-green-800">
                    A partir de R$ 80/dia
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Reforma e Reparos
                  </h4>
                  <p className="text-gray-600 mb-2">
                    Pequenos reparos e reformas residenciais
                  </p>
                  <Badge className="bg-green-100 text-green-800">
                    A partir de R$ 60/dia
                  </Badge>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-3">
              {mockReviews[selectedWorker?.id]?.map((review) => (
                <Card key={review.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="font-medium text-gray-900">
                            {review.name}
                          </h5>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-yellow-400 fill-current"
                              />
                            ))}
                            {[...Array(5 - review.rating)].map((_, i) => (
                              <Star
                                key={i + review.rating}
                                className="w-4 h-4 text-gray-300"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">
                          {review.comment}
                        </p>
                        <p className="text-gray-400 text-xs">{review.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) || (
                <div className="text-center py-8 text-gray-500">
                  <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Ainda não há avaliações para este profissional.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Booking Screen
  if (currentScreen === "booking") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onGoBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h2 className="ml-4 text-xl font-semibold">Agendar Serviço</h2>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Worker Summary */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedWorker?.avatar} />
                  <AvatarFallback>
                    {selectedWorker?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {selectedWorker?.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedWorker?.specialty}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <div>
            <Label className="text-base font-semibold text-gray-900">
              Descreva seu projeto
            </Label>
            <Textarea
              placeholder="Conte-nos sobre o trabalho que precisa ser feito..."
              className="mt-2 min-h-[100px] rounded-xl"
            />
          </div>

          {/* Date Selection */}
          <div>
            <Label className="text-base font-semibold text-gray-900 mb-3 block">
              Escolha a data
            </Label>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md"
                />
              </CardContent>
            </Card>
          </div>

          {/* Time Selection */}
          <div>
            <Label className="text-base font-semibold text-gray-900 mb-3 block">
              Horário preferido
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {["08:00", "10:00", "14:00", "16:00"].map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className={`h-12 rounded-xl ${
                    selectedTime === time
                      ? "bg-orange-600 text-white"
                      : "hover:bg-orange-50 hover:border-orange-200"
                  }`}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          <Card className="border-0 shadow-sm bg-orange-50">
            <CardHeader>
              <CardTitle className="text-lg">Resumo do Agendamento</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Profissional:</span>
                  <span className="font-medium">{selectedWorker?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString("pt-BR")}
                  </span>
                </div>
                {selectedTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Horário:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor estimado:</span>
                  <span className="font-medium text-orange-600">
                    {selectedWorker?.price}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={() => handleNavigate("booking-success")}
            className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
          >
            Confirmar Agendamento
          </Button>
        </div>
      </div>
    );
  }

  // Booking Success Screen
  if (currentScreen === "booking-success") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Agendamento Confirmado!
            </h2>
            <p className="text-gray-600">
              Seu agendamento foi enviado para {selectedWorker?.name}. Você
              receberá uma confirmação em breve.
            </p>
          </div>

          <div className="space-y-3 w-full">
            <Button
              onClick={() => handleNavigate("home")}
              className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
            >
              Voltar ao Início
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl"
              onClick={() => handleNavigate("chat")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Conversar com o Profissional
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Chat Screen
  if (currentScreen === "chat" && selectedWorker) {
    // Apenas João Silva (id: 1) terá chat funcional
    if (selectedWorker.id !== 1) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
          <div className="text-center space-y-4 max-w-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900">Chat em breve</h3>
            <p className="text-gray-600">
              Em breve você poderá conversar com este profissional. Por
              enquanto, use o agendamento para contatar.
            </p>
            <Button onClick={onGoBack} variant="outline" className="w-full">
              Voltar
            </Button>
          </div>
        </div>
      );
    }

    const workerMessages = messages[selectedWorker.id] || [];

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onGoBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center mx-3">
              <Avatar className="w-10 h-10 mr-3">
                <AvatarImage src={selectedWorker.avatar} />
                <AvatarFallback>{selectedWorker.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {selectedWorker.name}
                </h2>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* Messages */}
          <div className="space-y-3">
            {workerMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "client" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow-sm max-w-xs ${
                    message.sender === "client"
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "client"
                        ? "text-orange-200"
                        : "text-gray-500"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1 h-12 rounded-xl"
              onKeyPress={(e) => {
                if (e.key === "Enter" && chatMessage.trim()) {
                  addMessage(selectedWorker.id, chatMessage.trim());
                  setChatMessage("");
                }
              }}
            />
            <Button
              size="icon"
              className="h-12 w-12 bg-orange-600 hover:bg-orange-700 rounded-xl"
              onClick={() => {
                if (chatMessage.trim()) {
                  addMessage(selectedWorker.id, chatMessage.trim());
                  setChatMessage("");
                }
              }}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Bookings Screen
  if (currentScreen === "bookings") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Meus Agendamentos
          </h2>
        </div>

        <div className="p-4 space-y-4 pb-20">
          {mockBookings.length > 0 &&
            mockBookings.map((booking) => (
              <Card key={booking.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={booking.worker.avatar} />
                      <AvatarFallback>
                        {booking.worker.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {booking.worker.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {booking.service}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {new Date(booking.date).toLocaleDateString("pt-BR")}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {booking.time}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge
                          className={
                            booking.status === "confirmado"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {booking.status === "confirmado" ? (
                            <div className="flex items-center">
                              <Check className="w-3 h-3 mr-1" />
                              Confirmado
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              Pendente
                            </div>
                          )}
                        </Badge>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleNavigate("chat", booking.worker)}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {mockBookings.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum agendamento
              </h3>
              <p className="text-gray-600 mb-4">
                Você ainda não tem agendamentos marcados.
              </p>
              <Button
                onClick={() => handleNavigate("home")}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Buscar Profissionais
              </Button>
            </div>
          )}
        </div>

        {BottomNavigation}
      </div>
    );
  }

  // Search Screen
  if (currentScreen === "search") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Buscar Profissionais
          </h2>

          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por nome do profissional..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-xl bg-gray-100 border-0 focus:bg-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 h-10 px-4 rounded-xl border-gray-300 hover:border-orange-400 hover:text-orange-600"
              >
                <Filter className="w-4 h-4" />
                Filtros
                {(selectedCategory || selectedLocation) && (
                  <Badge className="bg-orange-600 text-white ml-1 px-1 py-0 text-xs min-w-5 h-5 rounded-full flex items-center justify-center">
                    {
                      [selectedCategory, selectedLocation].filter(Boolean)
                        .length
                    }
                  </Badge>
                )}
              </Button>

              {(selectedCategory || selectedLocation) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedLocation("");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Limpar filtros
                </Button>
              )}
            </div>

            {showFilters && (
              <Card className="border-0 shadow-sm bg-gray-50">
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Categorias de Serviços
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category.name}
                          variant={
                            selectedCategory === category.name
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setSelectedCategory(
                              selectedCategory === category.name
                                ? ""
                                : category.name
                            )
                          }
                          className={`justify-start h-auto py-3 ${
                            selectedCategory === category.name
                              ? "bg-orange-600 text-white border-orange-600"
                              : "hover:border-orange-300 hover:text-orange-600"
                          }`}
                        >
                          {category.icon === "Hammer" && (
                            <Hammer className="w-4 h-4 mr-2" />
                          )}
                          {category.icon === "Paintbrush" && (
                            <Paintbrush className="w-4 h-4 mr-2" />
                          )}
                          {category.icon === "Zap" && (
                            <Zap className="w-4 h-4 mr-2" />
                          )}
                          {category.icon === "Square" && (
                            <Square className="w-4 h-4 mr-2" />
                          )}
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Localização
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {locations.map((location) => (
                        <Button
                          key={location}
                          variant={
                            selectedLocation === location ? "default" : "ghost"
                          }
                          size="sm"
                          onClick={() =>
                            setSelectedLocation(
                              selectedLocation === location ? "" : location
                            )
                          }
                          className={`w-full justify-start ${
                            selectedLocation === location
                              ? "bg-orange-600 text-white"
                              : "hover:bg-orange-50 hover:text-orange-600"
                          }`}
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          {location}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Filters Summary */}
            {(selectedCategory || selectedLocation) && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">
                  Filtros aplicados:
                </span>
                {selectedCategory && (
                  <Badge className="bg-orange-100 text-orange-800 flex items-center gap-1">
                    {selectedCategory}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCategory("")}
                      className="text-orange-600 p-0 h-auto w-4 hover:bg-transparent"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                )}
                {selectedLocation && (
                  <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                    {selectedLocation.split(",")[0]}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedLocation("")}
                      className="text-blue-600 p-0 h-auto w-4 hover:bg-transparent"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 space-y-3 pb-20">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <Card
                key={worker.id}
                className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleNavigate("worker-profile", worker)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={worker.avatar} />
                      <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {worker.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {worker.specialty}
                      </p>

                      <div className="flex items-center space-x-4 mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium ml-1">
                            {worker.rating}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            ({worker.reviews} avaliações)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {worker.location}
                        </div>
                        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                          {worker.price}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum profissional encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros ou buscar por outro nome.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setSelectedLocation("");
                }}
                variant="outline"
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
        {BottomNavigation}
      </div>
    );
  }

  // Account Screen
  if (currentScreen === "account") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Minha Conta</h1>
        </div>

        <div className="p-4 space-y-4 pb-20">
          {/* Profile Section */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-xl">RS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">Renan Santos</h3>
                  <p className="text-gray-600">renansantos@maonaobra.com</p>
                  <Badge variant="secondary" className="mt-1">
                    Cliente Verificado
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Menu Options */}
          <div className="space-y-2">
            <Card className="border-0 shadow-sm relative opacity-60 cursor-not-allowed hover:shadow-md transition-shadow">
              <div className="absolute top-2 right-2 z-10">
                <Badge
                  variant="secondary"
                  className="text-xs bg-orange-100 text-orange-800"
                >
                  Em breve
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center w-full">
                  <User className="w-5 h-5 mr-3" />
                  <span>Editar Perfil</span>
                  <ChevronRight className="w-5 h-5 ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm relative opacity-60 cursor-not-allowed hover:shadow-md transition-shadow">
              <div className="absolute top-2 right-2 z-10">
                <Badge
                  variant="secondary"
                  className="text-xs bg-orange-100 text-orange-800"
                >
                  Em breve
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center w-full">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>Endereços</span>
                  <ChevronRight className="w-5 h-5 ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm relative opacity-60 cursor-not-allowed hover:shadow-md transition-shadow">
              <div className="absolute top-2 right-2 z-10">
                <Badge
                  variant="secondary"
                  className="text-xs bg-orange-100 text-orange-800"
                >
                  Em breve
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center w-full">
                  <Star className="w-5 h-5 mr-3" />
                  <span>Minhas Avaliações</span>
                  <ChevronRight className="w-5 h-5 ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm relative opacity-60 cursor-not-allowed hover:shadow-md transition-shadow">
              <div className="absolute top-2 right-2 z-10">
                <Badge
                  variant="secondary"
                  className="text-xs bg-orange-100 text-orange-800"
                >
                  Em breve
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center w-full">
                  <Settings className="w-5 h-5 mr-3" />
                  <span>Configurações</span>
                  <ChevronRight className="w-5 h-5 ml-auto" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Logout */}
          <Card className="border-0 shadow-sm mt-6 hover:shadow-md transition-shadow cursor-pointer hover:bg-red-50">
            <CardContent
              className="p-4"
              onClick={() => handleNavigate("welcome")}
            >
              <div className="flex items-center w-full text-red-600 hover:text-red-700">
                <ArrowLeft className="w-5 h-5 mr-3" />
                <span>Sair da Conta</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {BottomNavigation}
      </div>
    );
  }

  return null;
}
