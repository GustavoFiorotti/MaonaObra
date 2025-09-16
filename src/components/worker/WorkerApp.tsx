import React, { useState, useCallback, useMemo } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  ArrowLeft,
  User,
  Settings,
  Hammer,
  Home as HomeIcon,
  MessageCircle,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Send,
  Check,
  X,
  Plus,
  Edit,
  BarChart3,
  DollarSign,
  TrendingUp,
  Eye,
  ThumbsUp,
  Award,
  Shield,
  Star,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  workerProfile,
  workerBookings,
  workerMessages,
  workerStats,
} from "./data/mockData";

interface WorkerAppProps {
  currentScreen: string;
  onNavigate: (screen: string, data?: any) => void;
  onGoBack: () => void;
}

export function WorkerApp({
  currentScreen,
  onNavigate,
  onGoBack,
}: WorkerAppProps) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedClient, setSelectedClient] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  const handleNavigate = useCallback(
    (screen: string, data?: any) => {
      if (data) {
        if (screen === "worker-chat") {
          setSelectedClient(data);
        } else if (screen === "worker-booking-detail") {
          setSelectedBooking(data);
        }
      }
      onNavigate(screen, data);
    },
    [onNavigate]
  );

  const sendMessage = useCallback(() => {
    if (chatMessage.trim() && selectedClient) {
      // Em uma aplicação real, aqui você enviaria a mensagem
      setChatMessage("");
    }
  }, [chatMessage, selectedClient]);

  const acceptBooking = useCallback((bookingId: number) => {
    // Em uma aplicação real, aqui você atualizaria o status do agendamento
    console.log("Agendamento aceito:", bookingId);
  }, []);

  const rejectBooking = useCallback((bookingId: number) => {
    // Em uma aplicação real, aqui você rejeitaria o agendamento
    console.log("Agendamento rejeitado:", bookingId);
  }, []);

  // Bottom Navigation para Profissional
  const WorkerBottomNavigation = useMemo(
    () => (
      <div
        className="fixed bottom-0 left-1/2 translate-x-[-50%] bg-white border-t border-gray-200 px-4 py-2"
        style={{ width: 393 }}
      >
        <div className="flex justify-around items-center w-full">
          <Button
            variant={currentScreen === "worker-dashboard" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavigate("worker-dashboard")}
            className={`flex-col h-auto py-2 ${
              currentScreen === "worker-dashboard"
                ? "bg-orange-600 text-white"
                : "text-gray-600"
            }`}
          >
            <HomeIcon className="w-5 h-5 mb-1" />
            <span className="text-xs">Home</span>
          </Button>

          <Button
            variant={currentScreen === "worker-bookings" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavigate("worker-bookings")}
            className={`flex-col h-auto py-2 ${
              currentScreen === "worker-bookings"
                ? "bg-orange-600 text-white"
                : "text-gray-600"
            }`}
          >
            <CalendarIcon className="w-5 h-5 mb-1" />
            <span className="text-xs">Agendamentos</span>
          </Button>

          <Button
            variant={currentScreen === "worker-messages" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavigate("worker-messages")}
            className={`flex-col h-auto py-2 ${
              currentScreen === "worker-messages"
                ? "bg-orange-600 text-white"
                : "text-gray-600"
            }`}
          >
            <MessageCircle className="w-5 h-5 mb-1" />
            <span className="text-xs">Mensagens</span>
          </Button>

          <Button
            variant={currentScreen === "worker-profile" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavigate("worker-profile")}
            className={`flex-col h-auto py-2 ${
              currentScreen === "worker-profile"
                ? "bg-orange-600 text-white"
                : "text-gray-600"
            }`}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">Meu Perfil</span>
          </Button>
        </div>
      </div>
    ),
    [currentScreen, handleNavigate]
  );

  // Dashboard do Profissional
  if (currentScreen === "worker-dashboard") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Olá, João!</h1>
              <p className="text-gray-600">Aqui está seu painel do dia</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6 pb-20">
          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ganhos do Mês</p>
                    <p className="text-2xl font-bold text-gray-900">
                      R$ {workerStats.monthlyEarnings.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />+
                      {workerStats.monthlyGrowth}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Trabalhos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {workerStats.totalJobs}
                    </p>
                    <p className="text-sm text-blue-600 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Este mês
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Avaliação */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sua Avaliação</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {workerStats.averageRating}
                      </p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(workerStats.averageRating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {workerStats.totalReviews} avaliações
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <Shield className="w-3 h-3 mr-1" />
                  Verificado
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Próximos Agendamentos */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Próximos Agendamentos
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigate("worker-bookings")}
                className="text-orange-600 hover:text-orange-700"
              >
                Ver todos
              </Button>
            </div>

            <div className="space-y-3">
              {workerBookings
                .filter((b) => b.status !== "concluido")
                .slice(0, 3)
                .map((booking) => (
                  <Card key={booking.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {booking.client.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {booking.service}
                          </p>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              {new Date(booking.date).toLocaleDateString(
                                "pt-BR"
                              )}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {booking.time}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <Badge
                            className={
                              booking.status === "confirmado"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {booking.status === "confirmado"
                              ? "Confirmado"
                              : "Pendente"}
                          </Badge>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {booking.price}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>

        {WorkerBottomNavigation}
      </div>
    );
  }

  // Agendamentos do Profissional
  if (currentScreen === "worker-bookings") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onGoBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h2 className="ml-4 text-xl font-semibold text-gray-900">
              Agendamentos
            </h2>
          </div>
        </div>

        <div className="p-4 space-y-4 pb-20">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmados</TabsTrigger>
              <TabsTrigger value="completed">Concluídos</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-3">
              {workerBookings
                .filter((booking) => booking.status === "pendente")
                .map((booking) => (
                  <Card key={booking.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {booking.client.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {booking.client.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {booking.service}
                          </p>
                          <p className="text-sm text-gray-500 mb-3">
                            {booking.description}
                          </p>

                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              {new Date(booking.date).toLocaleDateString(
                                "pt-BR"
                              )}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {booking.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {booking.client.location}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-orange-600">
                              {booking.price}
                            </p>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50"
                                onClick={() => rejectBooking(booking.id)}
                              >
                                Recusar
                              </Button>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => acceptBooking(booking.id)}
                              >
                                Aceitar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="confirmed" className="space-y-3">
              {workerBookings
                .filter((booking) => booking.status === "confirmado")
                .map((booking) => (
                  <Card key={booking.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {booking.client.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {booking.client.name}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">
                                {booking.service}
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" />
                              Confirmado
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              {new Date(booking.date).toLocaleDateString(
                                "pt-BR"
                              )}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {booking.time}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-orange-600">
                              {booking.price}
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleNavigate(
                                  "worker-chat",
                                  booking.client.name
                                )
                              }
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
            </TabsContent>

            <TabsContent value="completed" className="space-y-3">
              {workerBookings
                .filter((booking) => booking.status === "concluido")
                .map((booking) => (
                  <Card
                    key={booking.id}
                    className="border-0 shadow-sm bg-gray-50"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {booking.client.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {booking.client.name}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">
                                {booking.service}
                              </p>
                            </div>
                            <Badge className="bg-gray-100 text-gray-800">
                              <Check className="w-3 h-3 mr-1" />
                              Concluído
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              {new Date(booking.date).toLocaleDateString(
                                "pt-BR"
                              )}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {booking.time}
                            </div>
                          </div>

                          <p className="font-semibold text-green-600">
                            {booking.price}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </div>

        {WorkerBottomNavigation}
      </div>
    );
  }

  // Mensagens do Profissional
  if (currentScreen === "worker-messages") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onGoBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h2 className="ml-4 text-xl font-semibold text-gray-900">
              Mensagens
            </h2>
          </div>
        </div>

        <div className="p-4 space-y-3 pb-20">
          {Object.keys(workerMessages).map((clientName) => (
            <Card
              key={clientName}
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleNavigate("worker-chat", clientName)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>{clientName.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">
                        {clientName}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {
                          workerMessages[clientName][
                            workerMessages[clientName].length - 1
                          ].time
                        }
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {
                        workerMessages[clientName][
                          workerMessages[clientName].length - 1
                        ].text
                      }
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {Object.keys(workerMessages).length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma mensagem
              </h3>
              <p className="text-gray-600">
                Mensagens de clientes aparecerão aqui.
              </p>
            </div>
          )}
        </div>

        {WorkerBottomNavigation}
      </div>
    );
  }

  // Chat do Profissional
  if (currentScreen === "worker-chat" && selectedClient) {
    const clientMessages = workerMessages[selectedClient] || [];

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onGoBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center mx-3">
              <Avatar className="w-10 h-10 mr-3">
                <AvatarFallback>{selectedClient.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {selectedClient}
                </h2>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="space-y-3">
            {clientMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "worker" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow-sm max-w-xs ${
                    message.sender === "worker"
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "worker"
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

        <div className="bg-white p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1 h-12 rounded-xl"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <Button
              size="icon"
              className="h-12 w-12 bg-orange-600 hover:bg-orange-700 rounded-xl"
              onClick={sendMessage}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Perfil do Profissional (Gerenciamento)
  if (currentScreen === "worker-profile") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          </div>
        </div>

        <div className="p-4 space-y-6 pb-20">
          {/* Profile Header */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={workerProfile.avatar} />
                <AvatarFallback className="text-2xl">
                  {workerProfile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <h3 className="text-2xl font-bold text-gray-900">
                {workerProfile.name}
              </h3>
              <p className="text-gray-600 mb-2">{workerProfile.specialty}</p>

              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold ml-1">
                    {workerProfile.rating}
                  </span>
                  <span className="text-gray-500 ml-1">
                    ({workerProfile.reviews} avaliações)
                  </span>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <Shield className="w-3 h-3 mr-1" />
                  Verificado
                </Badge>
              </div>

              <div className="relative opacity-60 cursor-not-allowed">
                <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-orange-100 text-orange-800"
                  >
                    Em breve
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                  disabled
                >
                  <Edit className="w-4 mr-2" />
                  Editar Perfil
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {workerStats.profileViews}
                </p>
                <p className="text-xs text-gray-600">Visualizações</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ThumbsUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {workerStats.totalReviews}
                </p>
                <p className="text-xs text-gray-600">Avaliações</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {workerStats.totalJobs}
                </p>
                <p className="text-xs text-gray-600">Trabalhos</p>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Management */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Meu Portfólio</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {workerProfile.portfolio.slice(0, 6).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-200 relative group"
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Trabalho ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="sm" variant="secondary">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Configurações</h3>

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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span>Configurações da Conta</span>
                  </div>
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <span>Preços e Disponibilidade</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm cursor-pointer hover:bg-red-50">
              <CardContent className="p-4">
                <div
                  className="flex items-center space-x-3 text-red-600"
                  onClick={() => handleNavigate("welcome")}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Sair da Conta</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {WorkerBottomNavigation}
      </div>
    );
  }

  return null;
}
