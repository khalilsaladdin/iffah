import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  User, 
  ArrowRight, 
  X, 
  Bookmark, 
  Share2, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { articlesData } from '../data/articlesData';

export default function ArticlesHub() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Semua');

  const categories = ['Semua', 'Neurosains', 'Tazkiyatun Nafs', 'Tips Taktis', 'Mentalitas Hijrah'];

  const filteredArticles = activeFilter === 'Semua'
    ? articlesData
    : articlesData.filter((a) => a.category === activeFilter);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Wawasan Ilmiah & Tazkiyah</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Kolom Artikel & Pemulihan
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Membongkar cara kerja otak pecandu secara neurosains dan metode ulama salaf dalam memutus jerat kebiasaan buruk.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group cursor-pointer rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-700/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  {article.category}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                {article.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                {article.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <User className="w-3.5 h-3.5 text-emerald-500" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Baca Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Baca Artikel Lengkap */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="sticky top-0 float-right z-10 p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedArticle.readTime}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 pb-4 border-b border-slate-800">
              <span>Ditulis oleh: <strong className="text-slate-200">{selectedArticle.author}</strong></span>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
              {selectedArticle.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-lg sm:text-xl font-bold text-emerald-300 mt-6 mb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                return (
                  <p key={idx} className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                Selesai Membaca
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
