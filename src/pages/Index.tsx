import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const MessengerApp = () => {
  const [activeSection, setActiveSection] = useState('chats');
  const [selectedChat, setSelectedChat] = useState(null);
  const [userRole, setUserRole] = useState('Creator'); // Creator, Moderator, Donator, User

  const sidebarItems = [
    { id: 'chats', label: 'Чаты', icon: 'MessageCircle', count: 3 },
    { id: 'servers', label: 'Серверы', icon: 'Server', count: 2 },
    { id: 'communities', label: 'Сообщества', icon: 'Users', count: 5 },
    { id: 'friends', label: 'Друзья', icon: 'UserPlus', count: 12 },
    { id: 'overview', label: 'Обзор', icon: 'Eye', count: 0 },
    { id: 'settings', label: 'Настройки', icon: 'Settings', count: 0 },
  ];

  const chats = [
    { id: 1, name: 'Анна Петрова', message: 'Привет! Как дела?', time: '14:32', unread: 2, online: true, avatar: '👩', type: 'private' },
    { id: 2, name: 'Dev Community', message: 'Релиз готов к деплою', time: '13:45', unread: 5, online: false, avatar: '💻', type: 'community' },
    { id: 3, name: 'Secret Chat', message: 'Введите код приглашения', time: '12:15', unread: 0, online: true, avatar: '🔒', type: 'hidden' },
  ];

  const servers = [
    { id: 'DEV001', name: 'Dev Server', type: 'remote', members: 25, avatar: '🚀', settings: { apps: ['vscode', 'python'], limit: '1GB' } },
    { id: 'GAME42', name: 'Gaming Hub', type: 'data', members: 150, avatar: '🎮', settings: { game_mode: 'minecraft', limit: '2GB' } },
  ];

  const communities = [
    { id: 1, name: 'JavaScript Developers', members: '12.5k', topic: 'Программирование', avatar: '⚛️' },
    { id: 2, name: 'UI/UX Design', members: '8.2k', topic: 'Дизайн', avatar: '🎨' },
    { id: 3, name: 'Crypto Talk', members: '25k', topic: 'Криптовалюты', avatar: '₿' },
  ];

  const messages = [
    { id: 1, author: 'Анна Петрова', message: 'Привет! Как дела с проектом?', time: '14:30', isOwn: false, type: 'text' },
    { id: 2, author: 'Вы', message: 'print("Hello World!")', time: '14:31', isOwn: true, type: 'code' },
    { id: 3, author: 'Анна Петрова', message: 'Супер! Код работает 🚀', time: '14:32', isOwn: false, type: 'text' },
  ];

  const renderHeader = () => (
    <div className="vk-header p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-bold text-lg">M</span>
        </div>
        <h1 className="text-xl font-medium">Messenger</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Badge variant="outline" className="text-white border-white">
          {userRole}
        </Badge>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
          <Icon name="LogOut" size={16} />
        </Button>
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div className="w-72 vk-sidebar p-4 space-y-2">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="text-xl bg-blue-100 text-blue-600">🚀</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-gray-900">admin</h3>
            <p className="text-sm text-gray-500">В сети</p>
          </div>
        </div>
      </div>
      
      {sidebarItems.map((item) => (
        <div
          key={item.id}
          className={`chat-item ${activeSection === item.id ? 'active-chat' : ''}`}
          onClick={() => setActiveSection(item.id)}
        >
          <Icon name={item.icon} size={20} className="text-gray-600" />
          <span className="flex-1 text-gray-900">{item.label}</span>
          {item.count > 0 && (
            <Badge className="vk-button text-xs">{item.count}</Badge>
          )}
        </div>
      ))}
    </div>
  );

  const renderChats = () => (
    <div className="flex-1 flex">
      <div className="w-80 bg-white border-r border-gray-200 p-4">
        <div className="mb-4 flex items-center justify-between">
          <Input 
            placeholder="Поиск чатов..." 
            className="flex-1 mr-2"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="vk-button px-3">
                <Icon name="Plus" size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="vk-card">
              <DialogHeader>
                <DialogTitle className="text-gray-900">Создать чат</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Название чата" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Тип чата" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Приватный</SelectItem>
                    <SelectItem value="community">Сообщество</SelectItem>
                    <SelectItem value="hidden">Скрытый</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Описание" />
                <Input placeholder="Настройки (JSON)" />
                <Button className="w-full vk-button">Создать чат</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`message-card cursor-pointer ${selectedChat === chat.id ? 'bg-blue-50 border-blue-200' : ''}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-2xl">{chat.avatar}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{chat.message}</p>
                    <div className="flex items-center space-x-1">
                      {chat.type === 'hidden' && <Icon name="Lock" size={12} className="text-gray-400" />}
                      {chat.unread > 0 && (
                        <Badge className="vk-button text-xs">{chat.unread}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col bg-white">
        {selectedChat ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="text-xl">👩</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-gray-900">Анна Петрова</h3>
                  <p className="text-sm text-green-600">В сети</p>
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
            
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                      msg.isOwn
                        ? 'vk-button text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                  >
                    {msg.type === 'code' ? (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">.py файл</span>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                              Редактировать
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                              Запустить
                            </Button>
                          </div>
                        </div>
                        <pre className="bg-gray-800 text-green-400 p-2 rounded text-sm">
                          <code>{msg.message}</code>
                        </pre>
                      </div>
                    ) : (
                      <p>{msg.message}</p>
                    )}
                    <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-200' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Напишите сообщение..."
                  className="flex-1"
                />
                <Button variant="ghost" size="sm">
                  <Icon name="Paperclip" size={16} />
                </Button>
                <Button className="vk-button">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50">
            <div className="text-center">
              <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Выберите чат для начала общения</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderServers = () => (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Серверы</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="vk-button hover-scale">
              <Icon name="Plus" size={16} className="mr-2" />
              Создать сервер
            </Button>
          </DialogTrigger>
          <DialogContent className="vk-card">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Создать новый сервер</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Тип сервера" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Удалённое управление</SelectItem>
                  <SelectItem value="data">Сервер с данными</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Настройки (JSON)" />
              <Input placeholder="Пароль" type="password" />
              <Button className="w-full vk-button">Создать сервер</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {servers.map((server) => (
          <Card key={server.id} className="vk-card hover-scale cursor-pointer animate-scale-in">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="text-2xl">{server.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-gray-900 text-lg">{server.name}</CardTitle>
                  <p className="text-gray-500 text-sm">ID: {server.id}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <Badge variant={server.type === 'remote' ? 'default' : 'secondary'}>
                  {server.type === 'remote' ? 'Удалённое управление' : 'С данными'}
                </Badge>
                <div className="flex items-center text-gray-500 text-sm">
                  <Icon name="Users" size={14} className="mr-1" />
                  {server.members}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {server.settings.apps && (
                  <p>Приложения: {server.settings.apps.join(', ')}</p>
                )}
                <p>Лимит: {server.settings.limit}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="flex-1 p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Обзор</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="vk-card">
          <CardHeader>
            <CardTitle className="text-gray-900">Все чаты</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {chats.map((chat) => (
                <div key={chat.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <h4 className="font-medium text-gray-900">{chat.name}</h4>
                    <p className="text-sm text-gray-500">Тип: {chat.type}</p>
                  </div>
                  <Badge variant="outline">{chat.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="vk-card">
          <CardHeader>
            <CardTitle className="text-gray-900">Все серверы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {servers.map((server) => (
                <div key={server.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <h4 className="font-medium text-gray-900">{server.name}</h4>
                    <p className="text-sm text-gray-500">ID: {server.id}</p>
                  </div>
                  <Badge variant="outline">{server.type}</Badge>
                </div>
              ))}
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
        return (
          <div className="flex-1 p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Сообщества</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {communities.map((community) => (
                <Card key={community.id} className="vk-card hover-scale cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="text-2xl">{community.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-gray-900 text-lg">{community.name}</CardTitle>
                        <p className="text-gray-500 text-sm">{community.topic}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm">{community.members} участников</span>
                      <Button size="sm" className="vk-button">Войти</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'overview':
        return renderOverview();
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50">
            <div className="text-center">
              <Icon name="Zap" size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Функция в разработке</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {renderHeader()}
      <div className="flex-1 flex">
        {renderSidebar()}
        {renderContent()}
      </div>
    </div>
  );
};

export default MessengerApp;