import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion } from '../types/solar';
import confetti from 'canvas-confetti';
import { X, Award, CheckCircle2, XCircle, RotateCcw, Sparkles, ChevronRight } from 'lucide-react';

interface KidsQuizModalProps {
  onClose: () => void;
  onSelectPlanet: (id: string) => void;
}

export const KidsQuizModal: React.FC<KidsQuizModalProps> = ({ onClose, onSelectPlanet }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const questions: QuizQuestion[] = QUIZ_QUESTIONS;
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;

    const isCorrect = selectedOptionId === currentQ.correctAnswerId;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      // Trigger kid celebratory confetti!
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }
    }

    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      if (score >= 4) {
        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 }
          });
        } catch (err) {
          // ignore
        }
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                પ્રાથમિક શાળા બાળ ક્વિઝ (Kids Quiz)
              </h2>
              <p className="text-xs text-slate-400">
                સૂર્યમંડળના ગ્રહો વિશે તમારું જ્ઞાન ચકાસો!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        {!isQuizCompleted ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>પ્રશ્ન {currentQuestionIndex + 1} / {questions.length}</span>
                <span className="text-amber-400 font-mono">સ્કોર: {score}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                વિજ્ઞાન સવાલ #{currentQuestionIndex + 1}:
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentQ.questionGu}
              </h3>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.id === currentQ.correctAnswerId;

                let optClass = 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-200';
                if (isSelected && !isAnswerSubmitted) {
                  optClass = 'bg-amber-500/20 border-amber-500 text-white font-semibold shadow-sm';
                } else if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-500/25 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between group ${optClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 flex items-center justify-center shrink-0 uppercase">
                        {opt.id}
                      </span>
                      <span>{opt.textGu}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Fun Fact */}
            {isAnswerSubmitted && (
              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                  selectedOptionId === currentQ.correctAnswerId
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {selectedOptionId === currentQ.correctAnswerId
                      ? 'વાહ! તમારો જવાબ સાચો છે!'
                      : 'ખોટો જવાબ! સાચો જવાબ ઉપર લીલા રંગમાં દર્શાવેલ છે.'}
                  </span>
                </div>
                <p>{currentQ.funFactGu}</p>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Results Screen */
          <div className="flex-1 overflow-y-auto p-6 text-center space-y-5">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/20">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white mb-1">
                શાબાશ બાળમિત્ર!
              </h3>
              <p className="text-sm text-slate-400">
                તમે સૂર્યમંડળની ક્વિઝ સફળતાપૂર્વક પૂર્ણ કરી છે!
              </p>
            </div>

            {/* Score Card */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 max-w-xs mx-auto">
              <span className="text-xs text-slate-400 block mb-1">તમારો સ્કોર:</span>
              <div className="text-3xl font-extrabold text-amber-400 font-mono">
                {score} / {questions.length}
              </div>
              <span className="text-xs text-emerald-400 font-semibold block mt-1">
                {score >= 6
                  ? '🌟 તમે સુપર સ્પેસ સાયન્ટિસ્ટ છો!'
                  : score >= 4
                  ? '👍 ખૂબ સરસ પ્રયાસ કર્યો!'
                  : '🚀 ફરીથી રમીને વધારે સ્કોર બનાવો!'}
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestartQuiz}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-colors shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ફરીથી રમો (Play Again)</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {!isQuizCompleted && (
          <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white"
            >
              પછી રમીશ
            </button>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOptionId}
                className="px-5 py-2 rounded-xl bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
              >
                જવાબ ચકાસો
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>{currentQuestionIndex + 1 === questions.length ? 'પરિણામ જુઓ' : 'આગળનો સવાલ'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
