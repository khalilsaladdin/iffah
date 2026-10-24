import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Brain, 
  CheckCircle2, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { screeningQuestions, severityLevels } from '../data/screeningData';
import { soundFx } from '../utils/audioHelper';

export default function ScreeningModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1..8 = questions, 9 = result
  const [answers, setAnswers] = useState({});
  const [selectedResult, setSelectedResult] = useState(null);

  if (!isOpen) return null;

  const totalQuestions = screeningQuestions.length;

  const handleStart = () => {
    soundFx.playTasbihClick();
    setCurrentStep(1);
    setAnswers({});
    setSelectedResult(null);
  };

  const handleSelectOption = (questionId, score) => {
    soundFx.playTasbihClick();
    const updated = { ...answers, [questionId]: score };
    setAnswers(updated);

    // Auto advance to next question if not at end
    if (currentStep < totalQuestions) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 250);
    } else {
      // Calculate total score and show result
      calculateResult(updated);
    }
  };

  const calculateResult = (finalAnswers) => {
    soundFx.playCelebrationTone();
    let totalScore = 0;
    Object.values(finalAnswers).forEach((s) => {
      totalScore += s;
    });

    const level = severityLevels.find(
      (lvl) => totalScore >= lvl.minScore && totalScore <= lvl.maxScore
    ) || severityLevels[severityLevels.length - 1];

    setSelectedResult({ totalScore, ...level });
    setCurrentStep(9);
  };

  const handleRetake = () => {
    soundFx.playTasbihClick();
    setCurrentStep(0);
    setAnswers({});
    setSelectedResult(null);
  };

  const currentQ = screeningQuestions[currentStep - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
        
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. INTRO SCREEN */}
        {currentStep === 0 && (
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-500 to-emerald-600 p-0.5 mx-auto shadow-xl shadow-emerald-950/60">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-amber-300">
                <Brain className="w-8 h-8 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instrumen Diagnosis Klinis & Tazkiyah</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Tes Skrining Mandiri Tingkat Ketergantungan
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto leading-relaxed">
                Diadaptasi dari <em>Cyber Pornography Addiction Screen (CPAS)</em>. Mengetahui seberapa dalam sirkuit otak dan kepekaan batinmu terpengaruh adalah langkah awal mutlak untuk sembuh.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left py-2">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-slate-300">
                <strong className="text-white block mb-0.5">⏱️ 8 Pertanyaan Singkat</strong>
                <span>Hanya membutuhkan 2-3 menit waktu hening.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-slate-300">
                <strong className="text-white block mb-0.5">🔒 100% Rahasia & Anonim</strong>
                <span>Jawaban tidak dikirim ke server manapun.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-slate-300">
                <strong className="text-white block mb-0.5">🎯 Rencana Aksi Personal</strong>
                <span>Dapatkan estimasi hari detoks dopaminmu.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-950/80 transition-all hover:scale-105 flex items-center justify-center gap-2 mx-auto"
              >
                <span>Bismillah, Mulai Skrining Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 2. QUESTION WIZARD SCREEN */}
        {currentStep >= 1 && currentStep <= totalQuestions && currentQ && (
          <div className="space-y-6 py-2">
            
            {/* Progress Header */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-bold">
                  {currentQ.category}
                </span>
                <span className="font-mono text-slate-300">
                  Pertanyaan {currentStep} dari {totalQuestions}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/10">
              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed mb-2">
                {currentQ.question}
              </h3>
              <p className="text-xs text-slate-400 italic flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{currentQ.desc}</span>
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentQ.id] === opt.score;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, opt.score)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-lg'
                        : 'bg-slate-900/80 border-white/10 hover:border-emerald-500/50 hover:bg-slate-900 text-slate-200'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">
                      {opt.text}
                    </span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-slate-700 bg-slate-950'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Back Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <span className="text-[11px] text-slate-500 italic">
                Pilih jawaban yang paling jujur menggambarkan kondisimu
              </span>
            </div>

          </div>
        )}

        {/* 3. DIAGNOSIS RESULT SCREEN */}
        {currentStep === 9 && selectedResult && (
          <div className="space-y-6 py-2 animate-in zoom-in duration-300">
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 mb-2">
                <ClipboardCheck className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Hasil Diagnosis Skrining Mandiri
              </span>
              <div className="flex items-center justify-center gap-2 my-2">
                <span className="text-4xl font-black text-white font-mono">
                  {selectedResult.totalScore}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  / 24 Poin
                </span>
              </div>

              <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${selectedResult.badgeColor} text-white font-black text-sm shadow-lg my-1`}>
                {selectedResult.level}
              </div>
            </div>

            {/* Summary & Brain Condition */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/10 space-y-3">
              <div>
                <strong className="text-xs uppercase tracking-wider text-amber-300 block mb-1">
                  Evaluasi Kondisi Jiwa & Saraf:
                </strong>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedResult.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <strong className="text-xs uppercase tracking-wider text-emerald-400 block mb-1">
                  Kondisi Prefrontal Cortex (PFC):
                </strong>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedResult.brainCondition}
                </p>
              </div>

              <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-900/50 text-xs font-bold text-emerald-300 text-center">
                🎯 {selectedResult.targetDays}
              </div>
            </div>

            {/* 7-Day Action Plan */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Rencana Aksi Personal yang Wajib Diterapkan:
              </span>
              <div className="space-y-2">
                {selectedResult.actionPlan.map((action, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-white/10 flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="w-full flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/60 transition-all text-center"
              >
                Mulai Pemulihan di Dashboard
              </button>

              <button
                onClick={handleRetake}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Tes</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
