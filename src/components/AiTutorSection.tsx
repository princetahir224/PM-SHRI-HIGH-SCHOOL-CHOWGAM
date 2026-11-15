import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Send,
  ClipboardCheck,
  MessageSquare,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Loader2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  GraduationCap,
  Phone
} from 'lucide-react';

type ClassLevel = 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10';
type SubjectName =
  | 'Mathematics'
  | 'Science'
  | 'English'
  | 'Social Science'
  | 'Urdu / Kashmiri'
  | 'ICT & Computer';
type TutorMode = 'qa' | 'questionnaire';
type AnswerStyle = 'explain' | 'step-by-step' | 'exam-notes';

interface ChatTurn {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

const CLASS_LEVELS: ClassLevel[] = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

const SUBJECTS: SubjectName[] = [
  'Mathematics',
  'Science',
  'English',
  'Social Science',
  'Urdu / Kashmiri',
  'ICT & Computer'
];

const SUGGESTED_TOPICS: Record<SubjectName, string[]> = {
  Mathematics: [
    'Linear Equations & Algebra',
    'Triangles & Pythagoras Theorem',
    'Fractions, Ratios & Percentages',
    'Quadratic Equations'
  ],
  Science: [
    'Photosynthesis & Plant Nutrition',
    'Light, Reflection & Refraction',
    'Acids, Bases & Salts',
    'Human Circulatory & Respiratory System'
  ],
  English: [
    'Tenses & Active-Passive Voice',
    'Formal Letter & Notice Writing',
    'Reading Comprehension Strategies',
    'Parts of Speech & Modals'
  ],
  'Social Science': [
    'Geography of Jammu & Kashmir',
    'Indian Constitution & Fundamental Rights',
    'Water Resources & Conservation',
    'Indian Freedom Movement'
  ],
  'Urdu / Kashmiri': [
    'Urdu Grammar (Ism, Fail, Sifat)',
    'Essay & Application Writing',
    'Moral Lessons & Classical Poetry',
    'Comprehension Practice'
  ],
  'ICT & Computer': [
    'Computer Hardware & Operating Systems',
    'Internet Safety & Digital Literacy',
    'Spreadsheets & Word Processing',
    'Introduction to Coding Logic'
  ]
};

const QUICK_QUESTIONS: Record<SubjectName, string[]> = {
  Mathematics: [
    'How do I solve linear equations step by step with an example?',
    'Explain Pythagoras theorem and where it is used in daily life.',
    'What is the difference between simple interest and compound interest?'
  ],
  Science: [
    'Explain photosynthesis with its balanced word and chemical equation.',
    'What is the difference between concave and convex mirrors?',
    'How do acids and bases react with litmus paper and metals?'
  ],
  English: [
    'How do I change a sentence from Active Voice to Passive Voice?',
    'Give me a neat format for writing a formal leave application to the Headmaster.',
    'Explain the 3 main tenses with simple examples for exams.'
  ],
  'Social Science': [
    'Describe the major rivers and mountain valleys of Jammu & Kashmir.',
    'What are the six Fundamental Rights in the Indian Constitution?',
    'Why is rainwater harvesting important in mountain regions?'
  ],
  'Urdu / Kashmiri': [
    'Explain Ism-e-Marifa and Ism-e-Nakira in simple words with examples.',
    'What are the key elements of a good Urdu essay for board exams?',
    'Explain the difference between Fail (Verb) and Sifat (Adjective).'
  ],
  'ICT & Computer': [
    'What is the difference between RAM, ROM, and secondary storage?',
    'How do basic formulas like SUM and AVERAGE work in a spreadsheet?',
    'What are 5 essential rules for staying safe while browsing the internet?'
  ]
};

function renderFormattedText(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={lineIdx} className="h-2" />;
    }

    const formatInline = (str: string) => {
      const parts = str.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
      return parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={idx} className="font-semibold text-stone-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={idx}
              className="font-mono text-[12px] bg-stone-100 text-emerald-950 px-1.5 py-0.5 rounded"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      });
    };

    if (trimmed.startsWith('### ')) {
      return (
        <h4 key={lineIdx} className="text-sm font-bold text-stone-900 mt-3 mb-1">
          {formatInline(trimmed.slice(4))}
        </h4>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h3 key={lineIdx} className="text-base font-bold text-stone-900 mt-3 mb-1">
          {formatInline(trimmed.slice(3))}
        </h3>
      );
    }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      return (
        <div key={lineIdx} className="flex items-start gap-2 pl-1 my-1">
          <span className="text-emerald-800 font-bold mt-0.5" aria-hidden="true">
            •
          </span>
          <span className="flex-1">{formatInline(trimmed.slice(2))}</span>
        </div>
      );
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+\.)\s(.*)$/);
      if (match) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 pl-1 my-1">
            <span className="font-mono font-bold text-emerald-900 tabular-nums shrink-0">
              {match[1]}
            </span>
            <span className="flex-1">{formatInline(match[2])}</span>
          </div>
        );
      }
    }

    return (
      <p key={lineIdx} className="my-1 leading-relaxed">
        {formatInline(line)}
      </p>
    );
  });
}

export const AiTutorSection: React.FC = () => {
  const [tutorMode, setTutorMode] = useState<TutorMode>('qa');
  const [studentClass, setStudentClass] = useState<ClassLevel>('Class 8');
  const [subject, setSubject] = useState<SubjectName>('Mathematics');
  const [answerStyle, setAnswerStyle] = useState<AnswerStyle>('explain');

  // Q&A Chat state
  const [questionInput, setQuestionInput] = useState('');
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [qaLoading, setQaLoading] = useState(false);
  const [qaError, setQaError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Practice Questionnaire state
  const [topicInput, setTopicInput] = useState<string>(SUGGESTED_TOPICS.Mathematics[0]);
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);

  useEffect(() => {
    if (messages.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages.length]);

  const handleSubjectChange = (newSubject: SubjectName) => {
    setSubject(newSubject);
    setTopicInput(SUGGESTED_TOPICS[newSubject][0]);
  };

  const askTutor = async (promptText: string, overrideStyle?: AnswerStyle) => {
    const trimmed = promptText.trim();
    if (!trimmed || qaLoading) return;

    setQaError(null);
    const userTurn: ChatTurn = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    const nextMessages = [...messages, userTurn];
    setMessages(nextMessages);
    setQuestionInput('');
    setQaLoading(true);

    try {
      const res = await fetch('/api/ai-tutor/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: trimmed,
          studentClass,
          subject,
          mode: overrideStyle || answerStyle,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Unable to get an answer from the AI Tutor.');
      }

      const modelTurn: ChatTurn = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.answer,
        timestamp: data.timestamp || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, modelTurn]);
    } catch (err: any) {
      setQaError(err?.message || 'Unable to connect to the AI Tutor service.');
    } finally {
      setQaLoading(false);
    }
  };

  const handleQaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askTutor(questionInput);
  };

  const handleGenerateQuiz = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (quizLoading) return;

    const chosenTopic = topicInput.trim() || SUGGESTED_TOPICS[subject][0];
    setQuizError(null);
    setQuizLoading(true);
    setQuizSubmitted(false);
    setSelectedAnswers({});
    setRevealedHints({});

    try {
      const res = await fetch('/api/ai-tutor/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentClass,
          subject,
          topic: chosenTopic,
          questionCount
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success || !Array.isArray(data.questions)) {
        throw new Error(data.error || 'Could not generate practice questionnaire.');
      }

      setQuizQuestions(data.questions);
    } catch (err: any) {
      setQuizError(err?.message || 'Unable to generate questionnaire right now.');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (quizQuestions.length === 0) return;
    setQuizSubmitted(true);
  };

  const handleDiscussQuestionInTutor = (q: QuizQuestion) => {
    const prompt = `Please explain this ${studentClass} ${subject} question step by step:\n"${q.question}"\nOptions: ${q.options.map((o, idx) => `${String.fromCharCode(65 + idx)}) ${o}`).join('; ')}`;
    setTutorMode('qa');
    askTutor(prompt, 'step-by-step');
  };

  const correctCount = quizQuestions.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <section id="ai-tutor" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
              Smart Learning & Student Practice Desk
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              AI Study Tutor & Interactive Questionnaire
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Available for Classes 6th to 10th students to ask subject questions, verify homework steps, and practice NCERT/JKBOSE chapter questionnaires anytime.
            </p>
          </div>

          {/* Mode Segmented Switcher */}
          <div className="inline-flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 self-start lg:self-end shrink-0">
            <button
              type="button"
              onClick={() => setTutorMode('qa')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                tutorMode === 'qa'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask AI Tutor (Q&A)</span>
            </button>
            <button
              type="button"
              onClick={() => setTutorMode('questionnaire')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                tutorMode === 'questionnaire'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Practice Questionnaire</span>
            </button>
          </div>
        </div>

        {/* Two-Zone Educational Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Control Deck (4 cols) */}
          <div className="lg:col-span-4 bg-stone-50 rounded-xl border border-stone-200 p-5 sm:p-6 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                1. Select Student Class
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-2">
                {CLASS_LEVELS.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setStudentClass(cls)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                      studentClass === cls
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-700'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                2. Select Subject
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SUBJECTS.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => handleSubjectChange(sub)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors truncate ${
                      subject === sub
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-700'
                    }`}
                    title={sub}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {tutorMode === 'qa' ? (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                  3. Explanation Style
                </div>
                <div className="space-y-2">
                  {[
                    { id: 'explain', label: 'Simple Explanation', desc: 'Clear concept overview with daily-life example' },
                    { id: 'step-by-step', label: 'Step-by-Step Solution', desc: 'Numbered working steps and formula checks' },
                    { id: 'exam-notes', label: 'JKBOSE Exam Revision', desc: 'Key definitions, common mistakes & practice prompt' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAnswerStyle(item.id as AnswerStyle)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        answerStyle === item.id
                          ? 'bg-white border-emerald-800 ring-1 ring-emerald-800'
                          : 'bg-white/70 border-stone-200 hover:bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-stone-900">{item.label}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleGenerateQuiz} className="space-y-4">
                <div>
                  <label htmlFor="quiz-topic" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    3. Chapter or Topic
                  </label>
                  <input
                    id="quiz-topic"
                    type="text"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    placeholder="Enter any chapter or topic..."
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-800"
                  />
                  <div className="mt-2.5 space-y-1.5">
                    <div className="text-[11px] font-medium text-stone-500">Suggested topics for {subject}:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTED_TOPICS[subject].map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setTopicInput(topic)}
                          className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors text-left ${
                            topicInput === topic
                              ? 'bg-emerald-50 text-emerald-950 border-emerald-700 font-semibold'
                              : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label htmlFor="quiz-count" className="font-bold uppercase tracking-wider text-stone-500">
                      Questions Count
                    </label>
                    <span className="font-mono font-bold text-emerald-900 tabular-nums">
                      {questionCount} Questions
                    </span>
                  </div>
                  <input
                    id="quiz-count"
                    type="range"
                    min={3}
                    max={8}
                    step={1}
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full accent-emerald-900 cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  disabled={quizLoading}
                  className="w-full py-2.5 px-4 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-60 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  {quizLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Preparing Questionnaire...</span>
                    </>
                  ) : (
                    <>
                      <ClipboardCheck className="w-4 h-4 text-amber-300" />
                      <span>Generate Practice Questionnaire</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Faculty Guidance Footer inside Control Deck */}
            <div className="pt-4 border-t border-stone-200 text-xs text-stone-600 space-y-1.5">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>School Academic Mentorship</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                For classroom verification or ICT Lab practice, reach out to <strong>Mr. Tahir Ahmad Kumar</strong> (Math & ICT In-charge) or <strong>Mr. Ajaz Ahmad Wani</strong> (Science Lab In-charge).
              </p>
              <a
                href="tel:8803497224"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 hover:underline pt-0.5"
              >
                <Phone className="w-3 h-3" />
                <span>Math & ICT In-charge: 8803497224</span>
              </a>
            </div>
          </div>

          {/* Right Interactive Stage (8 cols) */}
          <div className="lg:col-span-8 bg-stone-50 rounded-xl border border-stone-200 overflow-hidden flex flex-col min-h-[540px]">
            {/* Stage Context Header */}
            <div className="bg-white px-5 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <BookOpen className="w-4 h-4 text-emerald-800 shrink-0" />
                <span className="font-bold text-stone-900">{studentClass}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-emerald-900">{subject}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {tutorMode === 'qa' ? 'Interactive Q&A Tutor' : `Questionnaire (${quizQuestions.length || questionCount} Items)`}
                </span>
              </div>

              {tutorMode === 'qa' && messages.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setMessages([]);
                    setQaError(null);
                  }}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>New Session</span>
                </button>
              )}

              {tutorMode === 'questionnaire' && quizQuestions.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleGenerateQuiz()}
                  disabled={quizLoading}
                  className="text-xs font-semibold text-emerald-900 hover:bg-emerald-50 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>New Set</span>
                </button>
              )}
            </div>

            {/* MODE 1: Q&A AI TUTOR STAGE */}
            {tutorMode === 'qa' && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="p-5 sm:p-6 space-y-5 flex-1 overflow-y-auto max-h-[560px]">
                  {messages.length === 0 && (
                    <div className="space-y-6 py-4">
                      <div className="bg-white p-5 rounded-xl border border-stone-200">
                        <h3 className="text-base font-bold text-stone-900 mb-1.5">
                          Ask any {studentClass} {subject} Question
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                          Type a concept, textbook question, formula doubt, or homework problem below. Choose <strong>Simple Explanation</strong>, <strong>Step-by-Step Solution</strong>, or <strong>JKBOSE Exam Revision</strong> from the left panel.
                        </p>
                      </div>

                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                          Quick Starter Questions ({subject})
                        </div>
                        <div className="grid grid-cols-1 gap-2.5">
                          {QUICK_QUESTIONS[subject].map((q, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => askTutor(q)}
                              disabled={qaLoading}
                              className="text-left p-3.5 bg-white hover:border-emerald-700 rounded-xl border border-stone-200 text-xs sm:text-sm font-medium text-stone-800 transition-colors flex items-center justify-between gap-3 group"
                            >
                              <span>{q}</span>
                              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-800 shrink-0 transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {messages.map((turn) => (
                    <div
                      key={turn.id}
                      className={`flex flex-col ${
                        turn.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1 px-1">
                        <span className="font-semibold text-stone-700">
                          {turn.role === 'user' ? `${studentClass} Student` : 'AI Study Tutor'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{turn.timestamp}</span>
                      </div>
                      <div
                        className={`max-w-[92%] sm:max-w-[85%] rounded-xl px-4 py-3 text-xs sm:text-sm ${
                          turn.role === 'user'
                            ? 'bg-emerald-900 text-white'
                            : 'bg-white border border-stone-200 text-stone-800'
                        }`}
                      >
                        {turn.role === 'user' ? (
                          <p className="leading-relaxed whitespace-pre-wrap">{turn.text}</p>
                        ) : (
                          <div className="space-y-0.5">{renderFormattedText(turn.text)}</div>
                        )}
                      </div>
                    </div>
                  ))}

                  {qaLoading && (
                    <div className="flex items-center gap-2.5 text-xs text-stone-600 bg-white border border-stone-200 rounded-xl px-4 py-3 w-fit">
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-800" />
                      <span>Preparing {studentClass} {subject} explanation...</span>
                    </div>
                  )}

                  {qaError && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">Unable to answer right now</div>
                        <p className="mt-0.5 text-rose-800">{qaError}</p>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Persistent Composer Bar */}
                <form
                  onSubmit={handleQaSubmit}
                  className="p-4 bg-white border-t border-stone-200 flex items-center gap-2.5"
                >
                  <input
                    type="text"
                    value={questionInput}
                    onChange={(e) => setQuestionInput(e.target.value)}
                    placeholder={`Ask a ${studentClass} ${subject} question or follow-up...`}
                    disabled={qaLoading}
                    className="flex-1 bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                  />
                  <button
                    type="submit"
                    disabled={qaLoading || !questionInput.trim()}
                    className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Ask Tutor</span>
                  </button>
                </form>
              </div>
            )}

            {/* MODE 2: INTERACTIVE PRACTICE QUESTIONNAIRE STAGE */}
            {tutorMode === 'questionnaire' && (
              <div className="p-5 sm:p-6 flex-1 space-y-5">
                {quizError && (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Questionnaire Generation Error</div>
                      <p className="mt-0.5 text-rose-800">{quizError}</p>
                    </div>
                  </div>
                )}

                {quizQuestions.length === 0 && !quizLoading && (
                  <div className="bg-white rounded-xl border border-stone-200 p-8 text-center space-y-4 my-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mx-auto">
                      <ClipboardCheck className="w-6 h-6" />
                    </div>
                    <div className="max-w-md mx-auto">
                      <h3 className="text-lg font-bold text-stone-900">
                        Interactive {studentClass} {subject} Questionnaire
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                        Generate a custom {questionCount}-question practice sheet on <strong>{topicInput || SUGGESTED_TOPICS[subject][0]}</strong> with hints, instant grading, and tutor explanations.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleGenerateQuiz()}
                      className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs"
                    >
                      <ClipboardCheck className="w-4 h-4 text-amber-300" />
                      <span>Start {questionCount}-Question Practice</span>
                    </button>
                  </div>
                )}

                {quizLoading && (
                  <div className="bg-white rounded-xl border border-stone-200 p-10 text-center space-y-3 my-6">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-800 mx-auto" />
                    <div className="text-sm font-bold text-stone-900">
                      Creating {studentClass} {subject} Questionnaire...
                    </div>
                    <p className="text-xs text-stone-500">
                      Topic: {topicInput || SUGGESTED_TOPICS[subject][0]}
                    </p>
                  </div>
                )}

                {!quizLoading && quizQuestions.length > 0 && (
                  <div className="space-y-5">
                    {/* Score Summary Banner once submitted */}
                    {quizSubmitted && (
                      <div className="bg-white rounded-xl border border-emerald-300 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                            Questionnaire Result · {studentClass} {subject}
                          </div>
                          <div className="text-2xl font-extrabold text-stone-900 mt-1 tabular-nums">
                            {correctCount} / {quizQuestions.length} Correct (
                            {Math.round((correctCount / quizQuestions.length) * 100)}%)
                          </div>
                          <p className="text-xs text-stone-600 mt-1">
                            Review the tutor explanations below or click "Ask AI Tutor about this question" for deeper step-by-step help.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleGenerateQuiz()}
                          className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors shrink-0 whitespace-nowrap"
                        >
                          Try Another Questionnaire
                        </button>
                      </div>
                    )}

                    {/* Questions List */}
                    <div className="space-y-4">
                      {quizQuestions.map((q, qIdx) => {
                        const chosen = selectedAnswers[q.id];
                        const isCorrect = chosen === q.correctIndex;
                        const hintVisible = !!revealedHints[q.id];

                        return (
                          <div
                            key={q.id}
                            className="bg-white rounded-xl border border-stone-200 p-5 space-y-3.5"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                                <span className="font-mono text-emerald-900 mr-2 tabular-nums">
                                  Q{qIdx + 1}.
                                </span>
                                {q.question}
                              </div>

                              {quizSubmitted ? (
                                <span
                                  className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded shrink-0 ${
                                    isCorrect
                                      ? 'bg-emerald-100 text-emerald-900'
                                      : 'bg-rose-100 text-rose-900'
                                  }`}
                                >
                                  {isCorrect ? (
                                    <>
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      <span>Correct</span>
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="w-3.5 h-3.5" />
                                      <span>Review Needed</span>
                                    </>
                                  )}
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setRevealedHints(prev => ({
                                      ...prev,
                                      [q.id]: !prev[q.id]
                                    }))
                                  }
                                  className="text-[11px] font-semibold text-amber-800 hover:underline flex items-center gap-1 shrink-0"
                                >
                                  <Lightbulb className="w-3.5 h-3.5" />
                                  <span>{hintVisible ? 'Hide Hint' : 'Hint'}</span>
                                </button>
                              )}
                            </div>

                            {hintVisible && !quizSubmitted && (
                              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950">
                                <strong>Tutor Hint:</strong> {q.hint}
                              </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = chosen === optIdx;
                                const isAnswerKey = q.correctIndex === optIdx;
                                let optionClasses =
                                  'bg-stone-50 border-stone-200 text-stone-800 hover:border-emerald-700';

                                if (!quizSubmitted && isSelected) {
                                  optionClasses =
                                    'bg-emerald-50 border-emerald-800 text-emerald-950 ring-1 ring-emerald-800 font-semibold';
                                } else if (quizSubmitted) {
                                  if (isAnswerKey) {
                                    optionClasses =
                                      'bg-emerald-50 border-emerald-700 text-emerald-950 font-semibold';
                                  } else if (isSelected && !isAnswerKey) {
                                    optionClasses =
                                      'bg-rose-50 border-rose-500 text-rose-950';
                                  } else {
                                    optionClasses =
                                      'bg-stone-50 border-stone-200 text-stone-500';
                                  }
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    disabled={quizSubmitted}
                                    onClick={() => handleSelectOption(q.id, optIdx)}
                                    className={`text-left p-3 rounded-lg border text-xs transition-colors flex items-start gap-2.5 ${optionClasses}`}
                                  >
                                    <span className="font-mono font-bold shrink-0">
                                      {String.fromCharCode(65 + optIdx)}.
                                    </span>
                                    <span className="flex-1">{opt}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {quizSubmitted && (
                              <div className="pt-3 border-t border-stone-100 space-y-2">
                                <div className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200">
                                  <strong className="text-stone-900">Tutor Explanation: </strong>
                                  {q.explanation}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleDiscussQuestionInTutor(q)}
                                  className="text-xs font-bold text-emerald-900 hover:underline inline-flex items-center gap-1.5"
                                >
                                  <HelpCircle className="w-3.5 h-3.5" />
                                  <span>Ask AI Tutor about this question</span>
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit Questionnaire Action Bar */}
                    {!quizSubmitted && (
                      <div className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-xs text-stone-600 tabular-nums">
                          Answered <strong>{answeredCount}</strong> of{' '}
                          <strong>{quizQuestions.length}</strong> questions
                        </div>
                        <button
                          type="button"
                          onClick={handleSubmitQuiz}
                          disabled={answeredCount === 0}
                          className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                        >
                          Submit Questionnaire & Check Score
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
