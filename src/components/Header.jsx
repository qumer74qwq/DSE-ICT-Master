import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';

const Header = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/'); // 登出后跳转回首页
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">
            D
          </div>
          <span className="text-xl font-bold tracking-tight">DSE<span className="text-blue-400">ICT</span>Master</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">主頁</Link>
          <Link to="/syllabus" className="hover:text-blue-400 transition">課程與練習</Link>
          <Link to="/stats" className="hover:text-blue-400 transition">我的進度</Link>
          
          {/* User Info Section */}
            {user ? (
            <div className="flex items-center space-x-4 pl-6 border-l border-slate-700 ml-2">
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <UserIcon size={16} />
                <span>{user.username}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 text-sm bg-slate-800 hover:bg-red-600 px-3 py-1.5 rounded-md transition-colors"
              >
                <LogOut size={14} />
                <span>登出</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition"
            >
              登入 / 註冊
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 p-4 space-y-3 border-t border-slate-700">
          {user && (
            <div className="pb-3 border-b border-slate-700 mb-3 flex justify-between items-center">
               <span className="text-slate-300">你好, {user.username}</span>
               <button onClick={handleLogout} className="text-red-400 text-sm">登出</button>
            </div>
          )}
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2">主頁</Link>
          <Link to="/syllabus" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2">課程與練習</Link>
          <Link to="/stats" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2">我的進度</Link>
        </div>
      )}
    </header>
  );
};

export default Header;