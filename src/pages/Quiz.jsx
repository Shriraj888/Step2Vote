/**
 * Quiz Page
 *
 * AI-generated Indian election knowledge quiz with scoring and explanations.
 *
 * @component
 */

import { useState, useCallback } from 'react';
import { generateQuiz } from '../services/api';
import CivicIcon from '../components/ui/CivicIcon';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import './Quiz.css';

const QUIZ_TOPICS = [
  { id: 'general', label: 'Indian Election Process', icon: 'eci' },
  { id: 'registration', label: 'Form 6 and Voter Registration', icon: 'register' },
  { id: 'evm-vvpat', label: 'EVM and VVPAT', icon: 'evm' },
  { id: 'rights', label: 'Voter Rights and Conduct', icon: 'rights' },
  { id: 'mcc', label: 'Model Code of Conduct', icon: 'mcc' },
];

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const startQuiz = useCallback(async (topic) => {
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowExplanation(false);

    try {
      const data = await generateQuiz(5, topic);
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No questions were generated. Please try again.');
      }
      setQuestions(data);
    } catch (err) {
      setError(err.message || 'Failed to generate quiz. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAnswer = useCallback((index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentIndex].correctIndex) {
      setScore((prev) => prev + 1);
    }
  }, [selectedAnswer, questions, currentIndex]);

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [currentIndex, questions.length]);

  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setError(null);
  }, []);

  const currentQ = questions[currentIndex];
  const scorePercent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  if (questions.length === 0 && !isLoading) {
    return (
      <div className="quiz">
        <header className="quiz__header">
          <h1 className="quiz__title"><CivicIcon name="quiz" /> Indian Election Knowledge Quiz</h1>
          <p className="quiz__subtitle">Test your understanding of ECI-aligned voting processes. Choose a topic to begin.</p>
        </header>

        {error && (
          <div className="quiz__error" role="alert">
            <span aria-hidden="true">!</span> {error}
          </div>
        )}

        <div className="quiz__topics" role="group" aria-label="Quiz topics">
          {QUIZ_TOPICS.map((topic) => (
            <button key={topic.id} className="quiz__topic-btn" onClick={() => startQuiz(topic.label)} id={`quiz-topic-${topic.id}`}>
              <span className="quiz__topic-icon" aria-hidden="true"><CivicIcon name={topic.icon} /></span>
              <span className="quiz__topic-label">{topic.label}</span>
              <span className="quiz__topic-count">5 Questions</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="quiz quiz--centered">
        <LoadingSpinner size="lg" label="Generating quiz questions..." />
        <p className="quiz__loading-text">Gemini is crafting ECI-aligned questions. This may take a moment.</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="quiz quiz--centered">
        <div className="quiz__results">
          <div className="quiz__results-icon" aria-hidden="true">
            <CivicIcon name={scorePercent >= 80 ? 'ok' : scorePercent >= 60 ? 'check' : 'learn'} />
          </div>
          <h2 className="quiz__results-title">Quiz Complete!</h2>
          <div className="quiz__score-ring">
            <svg viewBox="0 0 100 100" className="quiz__score-svg" aria-hidden="true">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-primary)" strokeWidth="8"
                strokeDasharray={`${scorePercent * 2.64} 264`} strokeLinecap="round"
                transform="rotate(-90 50 50)" className="quiz__score-progress" />
            </svg>
            <span className="quiz__score-text" aria-label={`Score: ${score} out of ${questions.length}`}>
              {score}/{questions.length}
            </span>
          </div>
          <p className="quiz__results-message">
            {scorePercent >= 80 ? 'Excellent! You understand the voting process well.' : scorePercent >= 60 ? 'Good job! Keep verifying details from official ECI sources.' : 'Keep learning. The timeline and checklist can help you prepare.'}
          </p>
          <button className="quiz__restart-btn" onClick={resetQuiz}>Try Another Topic</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz__progress-bar">
        <div className="quiz__progress-fill" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} role="progressbar"
          aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={questions.length}
          aria-label={`Question ${currentIndex + 1} of ${questions.length}`} />
      </div>

      <div className="quiz__question-card">
        <div className="quiz__question-meta">
          <span className="quiz__question-num">Question {currentIndex + 1} of {questions.length}</span>
          <span className="quiz__question-score">Score: {score}</span>
        </div>

        <h2 className="quiz__question-text">{currentQ.question}</h2>

        <div className="quiz__options" role="radiogroup" aria-label="Answer options">
          {currentQ.options.map((option, i) => {
            let optionClass = 'quiz__option';
            if (selectedAnswer !== null) {
              if (i === currentQ.correctIndex) optionClass += ' quiz__option--correct';
              else if (i === selectedAnswer) optionClass += ' quiz__option--wrong';
            }

            return (
              <button key={option} className={optionClass} onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null} aria-label={`Option ${String.fromCharCode(65 + i)}: ${option}`}>
                <span className="quiz__option-letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                <span className="quiz__option-text">{option}</span>
                {selectedAnswer !== null && i === currentQ.correctIndex && <span className="quiz__option-icon" aria-hidden="true">OK</span>}
                {selectedAnswer === i && i !== currentQ.correctIndex && <span className="quiz__option-icon" aria-hidden="true">NO</span>}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="quiz__explanation" role="status">
            <strong>Explanation:</strong> {currentQ.explanation}
          </div>
        )}

        {selectedAnswer !== null && (
          <button className="quiz__next-btn" onClick={nextQuestion}>
            {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question'} -&gt;
          </button>
        )}
      </div>
    </div>
  );
}
