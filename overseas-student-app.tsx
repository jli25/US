import React, { useState } from 'react';
import { 
  Menu,
  Search,
  Heart,
  Clock,
  Edit3,
  ShoppingBag,
  MessageCircle,
  Share2, 
  Mail,
  ArrowLeft,
  X
} from 'lucide-react';

// Constants
const COLORS = {
  primary: '#FF0000',
  secondary: '#000000',
  white: '#FFFFFF',
  gray: '#6B7280'
};

const POST_CATEGORIES = ['全部', '拼车', '转租', '闲置', '活动', '咨询'];

const MOCK_POSTS = Array.from({ length: 20 }).map((_, i) => {
  const category = POST_CATEGORIES[Math.floor(Math.random() * (POST_CATEGORIES.length - 1)) + 1];
  const price = category === '转租' || category === '闲置' ? Math.floor(Math.random() * 1000) : undefined;
  
  return {
    id: i,
    authorName: `User ${i}`,
    authorAvatar: "/api/placeholder/40/40",
    content: `这是一条关于${category}的博文,欢迎大家多多交流!`, 
    images: ["/api/placeholder/300/300"],
    likes: Math.floor(Math.random() * 100),
    category,
    price
  }
});

// Basic Components
const Tag = ({ children }) => (
  <span className="inline-block bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
    {children}
  </span>
);

const CommunityPost = ({ post }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
    {post.images?.length > 0 && (
      <div className="w-full aspect-square overflow-hidden">
        <img src={post.images[0]} alt="post" className="w-full h-full object-cover" />
      </div>
    )}
    <div className="p-3">
      <div className="flex justify-between items-start mb-2">
        <Tag>{post.category}</Tag>
        {post.price && <div className="text-lg text-red-500 font-bold">¥{post.price}</div>}
      </div>
      <p className="text-sm line-clamp-2 mb-3">{post.content}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={post.authorAvatar} alt="avatar" className="w-5 h-5 rounded-full" />
          <span className="text-xs ml-1 text-gray-600">{post.authorName}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Heart size={16} className="text-gray-400" />
          <span className="text-xs text-gray-400">{post.likes}</span>  
        </div>
      </div>
    </div>
  </div>
);

// Icons  
const MapIcon = ({ color, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <polygon points="1 6 1 22 8 16 16 22 23 16 23 1 16 7 8 1 1 6" />
  </svg>
);

const CommunityIcon = ({ color, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />  
  </svg>
);

const AIAssistantIcon = ({ color, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" /> 
  </svg>
);

// Page Components
const CommunityPage = ({ setShowSideMenu, feedType, setFeedType, filter, setFilter }) => {
  const filteredPosts = MOCK_POSTS.filter(post => 
    feedType === 'discover' && (filter === '全部' || post.category === filter)
  );

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="flex justify-between items-center p-3">
          <button onClick={() => setShowSideMenu(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-red-500 text-lg font-bold">社区</div>
          <button>
            <Search className="w-5 h-5" />
          </button>
        </div>
        <div className="flex overflow-x-auto">
          <button
            className={`flex-shrink-0 px-4 py-3 text-sm border-b-2 ${
              feedType === 'following' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'
            }`}
            onClick={() => setFeedType('following')}
          >
            关注
          </button>
          <button
            className={`flex-shrink-0 px-4 py-3 text-sm border-b-2 ${
              feedType === 'discover' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500' 
            }`}
            onClick={() => setFeedType('discover')}
          >
            发现  
          </button>
        </div>
        {feedType === 'discover' && (
          <div className="flex space-x-2 px-3 overflow-x-auto text-xs">
            {POST_CATEGORIES.map(category => (
              <button
                key={category}
                className={`px-2 py-1 rounded-full ${
                  filter === category ? 'bg-red-500 text-white' : 'bg-red-100 text-red-600'  
                }`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-3">
        <div className="grid grid-cols-2 gap-3">
          {filteredPosts.map(post => (
            <CommunityPost key={post.id} post={post} />
          ))} 
        </div>
      </div>
    </div>
  );
};

// Navigation Components 
const BottomNavigation = ({ activeTab, setActiveTab }) => (
  <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around items-center py-1 px-2">
    <button onClick={() => setActiveTab('map')} className="p-2">
      <MapIcon color={activeTab === 'map' ? COLORS.primary : COLORS.gray} size={20} />
    </button>
    <button onClick={() => setActiveTab('toolbox')} className="p-2">  
      <ShoppingBag className={`w-5 h-5 ${activeTab === 'toolbox' ? 'text-red-500' : 'text-gray-500'}`} />
    </button>
    <button onClick={() => setActiveTab('community')} className="p-2">
      <CommunityIcon color={activeTab === 'community' ? COLORS.primary : COLORS.gray} size={20} /> 
    </button>
    <button onClick={() => setActiveTab('notifications')} className="p-2">
      <Mail className={`w-5 h-5 ${activeTab === 'notifications' ? 'text-red-500' : 'text-gray-500'}`} />
    </button>
    <button onClick={() => setActiveTab('profile')} className="p-2">
      <img src="/api/placeholder/20/20" alt="profile" className="w-5 h-5 rounded-full" />
    </button> 
  </div>
);

// Side Menu Component
const SideMenu = ({ showSideMenu, setShowSideMenu }) => (
  <div className={`fixed left-0 top-0 h-full w-72 max-w-[80%] bg-white shadow-lg transform transition-transform duration-300 z-50 ${showSideMenu ? 'translate-x-0' : '-translate-x-full'}`}>
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <button onClick={() => setShowSideMenu(false)} className="mr-3">  
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center flex-1">
            <img src="/api/placeholder/40/40" alt="avatar" className="w-10 h-10 rounded-full" />
            <div className="ml-3">
              <div className="text-sm font-bold">用户名</div>
              <div className="text-xs text-gray-500">查看个人主页</div>
            </div>  
          </div>
        </div>
      </div>
      <div className="flex-1 p-4"> 
        <div className="space-y-4">
          <button className="flex items-center text-gray-700 text-sm w-full p-2">
            <Clock className="w-4 h-4 mr-2" /> 浏览历史
          </button>
          <button className="flex items-center text-gray-700 text-sm w-full p-2">
            <Search className="w-4 h-4 mr-2" /> 发现用户
          </button> 
          <button className="flex items-center text-gray-700 text-sm w-full p-2">
            <Heart className="w-4 h-4 mr-2" /> 心愿单
          </button>
          <button className="flex items-center text-gray-700 text-sm w-full p-2">
            <MessageCircle className="w-4 h-4 mr-2" /> 联系客服  
          </button>
        </div>
      </div>
    </div>
  </div>
);

// AI Assistant Dialog
const AIDialog = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好,我是你的US人工智能助手,请问今天有什么可以帮到你的吗?' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { role: 'user', content: inputValue }]);
    setInputValue(''); 
  };

  return (
    <div className={`fixed inset-0 flex justify-center items-end sm:items-center bg-black/20 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-lg mb-0">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-lg font-bold">AI 助手</div>
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>  
        </div>
        <div className="h-80 overflow-y-auto p-4">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-2 flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`${msg.role === 'assistant' ? 'bg-red-500 text-white' : 'bg-gray-100'} max-w-xs p-3 rounded-lg shadow text-sm`} 
              >
                {msg.content}
              </div>
            </div>
          ))}  
        </div>
        <div className="p-4 flex space-x-4">
          <input 
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
            placeholder="输入消息..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button
            className="px-4 py-2 rounded-lg text-sm text-white bg-red-500"
            onClick={sendMessage} 
          >
            发送
          </button>
        </div>
      </div>  
    </div>
  );
};

// Main App
const OverseasStudentApp = () => {
  const [activeTab, setActiveTab] = useState('community');
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [filter, setFilter] = useState('全部'); 
  const [feedType, setFeedType] = useState('discover');

  return (
    <div className="h-screen w-full max-w-md mx-auto flex flex-col bg-gray-50 relative overflow-hidden">
      {activeTab === 'community' && (
        <CommunityPage 
          setShowSideMenu={setShowSideMenu}
          feedType={feedType}
          setFeedType={setFeedType} 
          filter={filter}
          setFilter={setFilter}
        /> 
      )}

      <SideMenu showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu} />
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />  

      <button
        className="fixed bottom-16 right-3 bg-gradient-to-r from-red-500 to-red-600 shadow-lg rounded-full p-2"
        onClick={() => setShowAIDialog(true)} 
      >
        <AIAssistantIcon color={COLORS.white} size={20} />
      </button>

      {showSideMenu && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setShowSideMenu(false)}
        />   
      )}
      
      <AIDialog isOpen={showAIDialog} setIsOpen={setShowAIDialog} />
    </div>
  );  
};

export default OverseasStudentApp
