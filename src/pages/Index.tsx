import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const MessengerApp = () => {
  const [activeSection, setActiveSection] = useState('chats');
  const [selectedChat, setSelectedChat] = useState(null);

  const sidebarItems = [
    { id: 'chats', label: 'Чаты', icon: 'MessageCircle', count: 3 },
    { id: 'servers', label: 'Серверы', icon: 'Server', count: 2 },
    { id: 'communities', label: 'Сообщества', icon: 'Users', count: 5 },
    { id: 'friends', label: 'Друзья', icon: 'UserPlus', count: 12 },
    { id: 'notifications', label: 'Уведомления', icon: 'Bell', count: 7 },
    { id: 'search', label: 'Поиск', icon: 'Search', count: 0 },
    { id: 'settings', label: 'Настройки', icon: 'Settings', count: 0 },
  ];

  const chats = [
    { id: 1, name: 'Анна Петрова', message: 'Привет! Как дела?', time: '14:32', unread: 2, online: true, avatar: '👩' },
    { id: 2, name: 'Команда Frontend', message: 'Релиз готов к деплою', time: '13:45', unread: 5, online: false, avatar: '💻' },
    { id: 3, name: 'Михаил', message: 'Созвонимся завтра?', time: '12:15', unread: 0, online: true, avatar: '👨' },
  ];

  const servers = [
    { id: 1, name: 'Dev Server', id_server: 'DEV001', type: 'private', members: 25, avatar: '🚀' },
    { id: 2, name: 'Gaming Hub', id_server: 'GAME42', type: 'public', members: 150, avatar: '🎮' },
  ];

  const communities = [
    { id: 1, name: 'JavaScript Developers', members: '12.5k', topic: 'Программирование', avatar: '⚛️' },
    { id: 2, name: 'UI/UX Design', members: '8.2k', topic: 'Дизайн', avatar: '🎨' },
    { id: 3, name: 'Crypto Talk', members: '25k', topic: 'Криптовалюты', avatar: '₿' },
  ];

  const messages = [
    { id: 1, author: 'Анна Петрова', message: 'Привет! Как дела с проектом?', time: '14:30', isOwn: false },
    { id: 2, author: 'Вы', message: 'Всё отлично! Почти закончил', time: '14:31', isOwn: true },
    { id: 3, author: 'Анна Петрова', message: 'Супер! Жду результат 🚀', time: '14:32', isOwn: false },
  ];

  const renderSidebar = () => (
    <div className="w-72 bg-slate-800 border-r border-slate-700 p-4 space-y-2">
      <div className="mb-6">
        <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
          Messenger
        </h1>
        <p className="text-slate-400 text-sm">Современный чат</p>
      </div>
      
      {sidebarItems.map((item) => (
        <div
          key={item.id}
          className={`chat-item ${activeSection === item.id ? 'bg-slate-700' : ''}`}
          onClick={() => setActiveSection(item.id)}
        >
          <Icon name={item.icon} size={20} className="text-slate-300" />
          <span className="flex-1 text-slate-200">{item.label}</span>
          {item.count > 0 && (
            <Badge className="bg-primary text-primary-foreground">{item.count}</Badge>
          )}
        </div>
      ))}
    </div>
  );

  const renderChats = () => (
    <div className="flex-1 flex">
      <div className="w-80 bg-slate-800 border-r border-slate-700 p-4">
        <div className="mb-4">
          <Input 
            placeholder="Поиск чатов..." 
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
        </div>
        
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`message-card cursor-pointer ${selectedChat === chat.id ? 'bg-slate-700' : ''}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-2xl">{chat.avatar}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white truncate">{chat.name}</h3>
                    <span className="text-xs text-slate-400">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400 truncate">{chat.message}</p>
                    {chat.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="bg-slate-800 border-b border-slate-700 p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="text-xl">👩</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-white">Анна Петрова</h3>
                  <p className="text-sm text-green-400">В сети</p>
                </div>
                <div className="ml-auto flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Phone" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Video" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                      msg.isOwn
                        ? 'gradient-primary text-white'
                        : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? 'text-slate-200' : 'text-slate-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-slate-800 border-t border-slate-700 p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Напишите сообщение..."
                  className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
                <Button className="gradient-primary">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-slate-600" />
              <p className="text-lg">Выберите чат для начала общения</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderServers = () => (
    <div className="flex-1 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Серверы</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary hover-scale">
              <Icon name="Plus" size={16} className="mr-2" />
              Создать сервер
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Создать новый сервер</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Название сервера" className="bg-slate-700 border-slate-600 text-white" />
              <Input placeholder="ID сервера" className="bg-slate-700 border-slate-600 text-white" />
              <Input placeholder="Пароль" type="password" className="bg-slate-700 border-slate-600 text-white" />
              <Tabs defaultValue="simple" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                  <TabsTrigger value="simple" className="data-[state=active]:bg-slate-600">Простой</TabsTrigger>
                  <TabsTrigger value="data" className="data-[state=active]:bg-slate-600">С данными</TabsTrigger>
                </TabsList>
                <TabsContent value="simple" className="text-slate-300">
                  Обычный сервер для общения
                </TabsContent>
                <TabsContent value="data" className="text-slate-300">
                  Сервер с расширенными возможностями хранения данных
                </TabsContent>
              </Tabs>
              <Button className="w-full gradient-primary">Создать сервер</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {servers.map((server) => (
          <Card key={server.id} className="gradient-card hover-scale cursor-pointer animate-scale-in">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="text-2xl">{server.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-white text-lg">{server.name}</CardTitle>
                  <p className="text-slate-400 text-sm">ID: {server.id_server}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant={server.type === 'private' ? 'destructive' : 'default'}>
                  {server.type === 'private' ? 'Приватный' : 'Публичный'}
                </Badge>
                <div className="flex items-center text-slate-400 text-sm">
                  <Icon name="Users" size={14} className="mr-1" />
                  {server.members}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCommunities = () => (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Сообщества</h2>
        <Input 
          placeholder="Поиск сообществ..." 
          className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 max-w-md"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {communities.map((community) => (
          <Card key={community.id} className="gradient-card hover-scale cursor-pointer animate-scale-in">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="text-2xl">{community.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-white text-lg">{community.name}</CardTitle>
                  <p className="text-slate-400 text-sm">{community.topic}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-slate-400 text-sm">
                  <Icon name="Users" size={14} className="mr-1" />
                  {community.members} участников
                </div>
                <Button size="sm" className="gradient-primary">
                  Войти
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="gradient-card">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="text-4xl">🚀</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white text-2xl">Юрий Космонавт</CardTitle>
                <p className="text-slate-400">@yura_astronaut</p>
                <div className="flex items-center mt-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-400 text-sm">В сети</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-white font-medium mb-2">О себе</h3>
              <p className="text-slate-300">
                Разработчик и космонавт. Создаю современные интерфейсы между звёзд ✨
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-3">Статистика</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700 rounded-lg p-3">
                  <p className="text-slate-400 text-sm">Сообщений</p>
                  <p className="text-white text-xl font-bold">1,247</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-3">
                  <p className="text-slate-400 text-sm">Друзей</p>
                  <p className="text-white text-xl font-bold">156</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button className="gradient-primary flex-1">
                Редактировать профиль
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300">
                Настройки
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'chats':
        return renderChats();
      case 'servers':
        return renderServers();
      case 'communities':
        return renderCommunities();
      case 'settings':
        return renderProfile();
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <Icon name="Zap" size={64} className="mx-auto mb-4 text-slate-600" />
              <p className="text-lg">Функция в разработке</p>
              <p className="text-sm">Скоро здесь появится что-то интересное!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {renderSidebar()}
      {renderContent()}
    </div>
  );
};

export default MessengerApp;