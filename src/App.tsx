import React, { useState, useCallback } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { ArrowLeft, User, Hammer } from "lucide-react";
import { ClientApp } from "./components/client/ClientApp";
import { WorkerApp } from "./components/worker/WorkerApp";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [userType, setUserType] = useState("");
  const [navigationHistory, setNavigationHistory] = useState(["welcome"]);

  const navigateTo = useCallback(
    (screen: string, data?: any) => {
      setNavigationHistory((prev) => [...prev, currentScreen]);
      setCurrentScreen(screen);
    },
    [currentScreen]
  );

  const goBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      const previousScreen = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory((prev) => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
    }
  }, [navigationHistory]);

  const resetNavigation = useCallback(() => {
    setNavigationHistory(["welcome"]);
    setCurrentScreen("welcome");
    setUserType("");
  }, []);

  // Welcome Screen
  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
          <div className="text-center space-y-4">
            <img
              src="public\images\logo.png"
              alt="Mão na Obra Logo"
              className="w-32 h-32 mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-900">Mão na Obra</h1>
            <p className="text-gray-600 max-w-xs">
              Conecte-se com os melhores profissionais da sua região
            </p>
          </div>

          <div className="w-full max-w-sm space-y-4">
            <Button
              onClick={() => {
                setUserType("client");
                navigateTo("login");
              }}
              className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
            >
              <User className="w-5 h-5 mr-2" />
              Entrar como Cliente
            </Button>

            <Button
              onClick={() => {
                setUserType("worker");
                navigateTo("login");
              }}
              variant="outline"
              className="w-full h-14 border-2 border-orange-600 text-orange-600 hover:bg-orange-50 rounded-xl"
            >
              <Hammer className="w-5 h-5 mr-2" />
              Entrar como Profissional
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Login Screen
  if (currentScreen === "login") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex items-center p-4 border-b">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="ml-4 text-xl font-semibold">
            {userType === "client" ? "Login Cliente" : "Login Profissional"}
          </h2>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                {userType === "client" ? (
                  <User className="w-8 h-8 text-orange-600" />
                ) : (
                  <Hammer className="w-8 h-8 text-orange-600" />
                )}
              </div>
              <p className="text-gray-600">
                {userType === "client"
                  ? "Encontre o profissional ideal para seu projeto"
                  : "Conecte-se com novos clientes"}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="mt-1 h-12 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 h-12 rounded-xl"
                />
              </div>

              <Button
                onClick={() =>
                  navigateTo(
                    userType === "client" ? "home" : "worker-dashboard"
                  )
                }
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-xl mt-6"
              >
                Entrar
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">
                    ou
                  </span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600">
                  Não tem conta?
                  <Button variant="link" className="p-0 ml-1 text-orange-600">
                    Cadastre-se
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar telas do Cliente
  if (
    userType === "client" &&
    [
      "home",
      "worker-profile",
      "booking",
      "booking-success",
      "chat",
      "bookings",
      "search",
      "account",
    ].includes(currentScreen)
  ) {
    return (
      <ClientApp
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onGoBack={goBack}
      />
    );
  }

  // Renderizar telas do Profissional
  if (
    userType === "worker" &&
    [
      "worker-dashboard",
      "worker-bookings",
      "worker-messages",
      "worker-chat",
      "worker-profile",
    ].includes(currentScreen)
  ) {
    return (
      <WorkerApp
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onGoBack={goBack}
      />
    );
  }

  // Fallback para telas não reconhecidas
  return null;
}
