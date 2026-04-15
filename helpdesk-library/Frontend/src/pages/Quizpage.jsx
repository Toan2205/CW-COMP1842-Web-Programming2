import { useEffect, useState } from 'react';
import { getAllIssues } from '../api/helpdeskApi';

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const TOTAL_QUESTIONS = 5;

const QuizPage = () => {
  const [allIssues, setAllIssues] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadQuiz = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllIssues();
      const issues = res.data;
      if (issues.length < 2) {
        setError('Not enough issues to start a quiz. Please add at least 2 issues.');
        setLoading(false);
        return;
      }
      setAllIssues(issues);
      generateQuestions(issues);
    } catch {
      setError('Failed to load quiz. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const generateQuestions = (issues) => {
    const pool = shuffle(issues).slice(0, Math.min(TOTAL_QUESTIONS, issues.length));
    const generated = pool.map((correct) => {
      const distractors = shuffle(issues.filter((i) => i._id !== correct._id)).slice(0, 3);
      const options = shuffle([correct, ...distractors]);
      return { correct, options };
    });
    setQuestions(generated);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const handleAnswer = (option) => {
    if (selected) return;
    setSelected(option._id);
    if (option._id === questions[current].correct._id) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const getScoreLabel = () => {
    const pct = (score / questions.length) * 100;
    if (pct === 100) return '🏆 Perfect Score!';
    if (pct >= 80) return '🎉 Great job!';
    if (pct >= 60) return '👍 Good effort!';
    return '📚 Keep studying!';
  };

  if (loading) return <div className="page"><p className="status-msg">Loading quiz...</p></div>;
  if (error) return <div className="page"><p className="status-msg error">{error}</p></div>;

  if (finished) {
    return (
      <div className="page">
        <div className="quiz-container">
          <div className="quiz-result">
            <h2>{getScoreLabel()}</h2>
            <p className="score-display">{score} / {questions.length}</p>
            <p className="score-sub">You answered {score} out of {questions.length} questions correctly.</p>
            <button className="btn-retry" onClick={() => generateQuestions(allIssues)}>
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const { correct, options } = questions[current];

  return (
    <div className="page">
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>🧠 Staff Training Quiz</h1>
          <span className="quiz-progress">Question {current + 1} / {questions.length}</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="quiz-question">
          <p className="question-label">Which response matches this issue code?</p>
          <span className="issue-code-quiz">{correct.issueCode}</span>
        </div>

        <div className="quiz-options">
          {options.map((option) => {
            let cls = 'option-btn';
            if (selected) {
              if (option._id === correct._id) cls += ' correct';
              else if (option._id === selected) cls += ' wrong';
            }
            return (
              <button
                key={option._id}
                className={cls}
                onClick={() => handleAnswer(option)}
              >
                {option.response}
              </button>
            );
          })}
        </div>

        {selected && (
          <div className={`feedback ${selected === correct._id ? 'feedback-correct' : 'feedback-wrong'}`}>
            {selected === correct._id
              ? '✅ Correct!'
              : `❌ Incorrect. The correct answer was: "${correct.response}"`}
          </div>
        )}

        {selected && (
          <button className="btn-next" onClick={handleNext}>
            {current + 1 >= questions.length ? 'See Results →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
