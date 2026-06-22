import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, X, ChevronUp, ChevronDown, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const DEFAULT_TESTS = [
  { id: 1, name: 'Calculus Test 1', subject: 'Mathematics', duration: 60, questions: 0, difficulty: 'Medium', questionsList: [] },
  { id: 2, name: 'Physics Mechanics', subject: 'Physics', duration: 90, questions: 0, difficulty: 'Hard', questionsList: [] },
  { id: 3, name: 'GRE Verbal Practice', subject: 'GRE', duration: 30, questions: 0, difficulty: 'Hard', questionsList: [] },
]

const loadTests = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('nova_practice_tests') || 'null')
    return saved && saved.length > 0 ? saved : DEFAULT_TESTS
  } catch { return DEFAULT_TESTS }
}

export default function PracticeTestManagement() {
  const [tests, setTests] = useState(loadTests);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', subject: '', duration: 0, questions: 0, difficulty: 'Medium' });
  const [editId, setEditId] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [questionForm, setQuestionForm] = useState({ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A', marks: 1 });
  const [editQuestionIndex, setEditQuestionIndex] = useState(null);
  const [showQuestionList, setShowQuestionList] = useState(null);

  useEffect(() => { localStorage.setItem('nova_practice_tests', JSON.stringify(tests)) }, [tests])

  const saveTests = (updated) => {
    const synced = updated.map(t => ({
      ...t,
      questions: (t.questionsList || []).length
    }))
    setTests(synced)
  }

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      saveTests(tests.map(t => t.id === editId ? { ...form, id: editId, questionsList: t.questionsList || [] } : t));
    } else {
      saveTests([...tests, { ...form, id: Date.now(), questionsList: [] }]);
    }
    setForm({ name: '', subject: '', duration: 0, questions: 0, difficulty: 'Medium' });
    setEditId(null);
    setShowForm(false);
    toast.success(editId ? 'Test updated' : 'Test created');
  };

  const handleEdit = (t) => {
    setForm({ name: t.name, subject: t.subject, duration: t.duration, questions: t.questions, difficulty: t.difficulty || 'Medium' });
    setEditId(t.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this test?')) return;
    saveTests(tests.filter(t => t.id !== id));
    toast.success('Test deleted');
  };

  const openQuestionModal = (test) => {
    setSelectedTest(test);
    setQuestionForm({ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A', marks: 1 });
    setEditQuestionIndex(null);
    setShowQuestionModal(true);
  };

  const handleEditQuestion = (test, qIndex) => {
    const q = test.questionsList[qIndex];
    setSelectedTest(test);
    setQuestionForm({
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer,
      marks: q.marks
    });
    setEditQuestionIndex(qIndex);
    setShowQuestionModal(true);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!questionForm.question.trim() || !questionForm.optionA.trim() || !questionForm.optionB.trim()) {
      toast.error('Question and at least two options are required');
      return;
    }
    const updated = tests.map(t => {
      if (t.id !== selectedTest.id) return t;
      const qList = [...(t.questionsList || [])];
      if (editQuestionIndex !== null) {
        qList[editQuestionIndex] = { ...questionForm };
      } else {
        qList.push({ ...questionForm });
      }
      return { ...t, questionsList: qList };
    });
    saveTests(updated);
    setShowQuestionModal(false);
    setSelectedTest(null);
    setEditQuestionIndex(null);
    toast.success(editQuestionIndex !== null ? 'Question updated' : 'Question added');
  };

  const handleDeleteQuestion = (testId, qIndex) => {
    if (!window.confirm('Delete this question?')) return;
    const updated = tests.map(t => {
      if (t.id !== testId) return t;
      const qList = [...(t.questionsList || [])];
      qList.splice(qIndex, 1);
      return { ...t, questionsList: qList };
    });
    saveTests(updated);
    toast.success('Question deleted');
  };

  const moveQuestion = (testId, qIndex, direction) => {
    const updated = tests.map(t => {
      if (t.id !== testId) return t;
      const qList = [...(t.questionsList || [])];
      const target = qIndex + direction;
      if (target < 0 || target >= qList.length) return t;
      [qList[qIndex], qList[target]] = [qList[target], qList[qIndex]];
      return { ...t, questionsList: qList };
    });
    saveTests(updated);
  };

  const copyQuestion = (testId, qIndex) => {
    const updated = tests.map(t => {
      if (t.id !== testId) return t;
      const qList = [...(t.questionsList || [])];
      qList.splice(qIndex + 1, 0, { ...qList[qIndex] });
      return { ...t, questionsList: qList };
    });
    saveTests(updated);
    toast.success('Question duplicated');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold" style={{ color: '#196d83' }}>Practice Test Management</h2>
        <p className="text-gray-600 mt-2">Create and manage practice tests with questions</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 md:p-8">
        <button
          className="mb-4 px-4 py-2 rounded bg-[#196d83] text-white font-bold"
          onClick={() => {
            setShowForm(!showForm);
            setForm({ name: '', subject: '', duration: 0, questions: 0, difficulty: 'Medium' });
            setEditId(null);
          }}
        >
          {showForm ? 'Cancel' : 'Add Practice Test'}
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleInputChange} placeholder="Test Name" className="w-full px-4 py-2 border rounded" required />
            <input name="subject" value={form.subject} onChange={handleInputChange} placeholder="Subject" className="w-full px-4 py-2 border rounded" required />
            <input name="duration" type="number" value={form.duration} onChange={handleInputChange} placeholder="Duration (minutes)" className="w-full px-4 py-2 border rounded" min={0} required />
            <input name="questions" type="number" value={form.questions} onChange={handleInputChange} placeholder="No. of Questions" className="w-full px-4 py-2 border rounded" min={0} required />
            <button type="submit" className="col-span-full px-4 py-2 rounded bg-[#196d83] text-white font-bold">
              {editId ? 'Update' : 'Create'}
            </button>
          </form>
        )}
        {tests.length === 0 ? (
          <div className="text-gray-600 text-center py-8">No practice tests found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Test Name</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                  <th className="px-4 py-2 text-left">Questions</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{t.name}</td>
                    <td className="px-4 py-2">{t.subject}</td>
                    <td className="px-4 py-2">{t.duration} min</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => setShowQuestionList(showQuestionList === t.id ? null : t.id)}
                        className="text-[#196d83] font-semibold underline hover:no-underline"
                      >
                        {t.questionsList?.length || 0} questions
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button className="px-2 py-1 rounded bg-green-600 text-white text-xs flex items-center gap-1" onClick={() => openQuestionModal(t)}>
                          <Plus size={14} /> Questions
                        </button>
                        <button className="px-2 py-1 rounded bg-[#196d83] text-white text-xs" onClick={() => handleEdit(t)}>
                          <Edit size={14} />
                        </button>
                        <button className="px-2 py-1 rounded bg-red-600 text-white text-xs" onClick={() => handleDelete(t.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Question list inline */}
        {showQuestionList && (() => {
          const test = tests.find(t => t.id === showQuestionList)
          if (!test || !test.questionsList?.length) return (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center text-gray-500 text-sm">
              No questions added yet. Click "Questions" to add.
            </div>
          )
          return (
            <div className="mt-4 border rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 font-semibold text-sm text-gray-700">
                Questions for: {test.name}
              </div>
              <div className="divide-y">
                {test.questionsList.map((q, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          <span className="text-gray-500">Q{i + 1}.</span> {q.question}
                        </p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
                          <span className={q.correctAnswer === 'A' ? 'text-green-600 font-bold' : ''}>A) {q.optionA}</span>
                          <span className={q.correctAnswer === 'B' ? 'text-green-600 font-bold' : ''}>B) {q.optionB}</span>
                          <span className={q.correctAnswer === 'C' ? 'text-green-600 font-bold' : ''}>C) {q.optionC}</span>
                          <span className={q.correctAnswer === 'D' ? 'text-green-600 font-bold' : ''}>D) {q.optionD}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Marks: {q.marks} | Answer: {q.correctAnswer}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button className="p-1 rounded hover:bg-gray-200 text-gray-600" onClick={() => moveQuestion(test.id, i, -1)} disabled={i === 0}><ChevronUp size={16} /></button>
                        <button className="p-1 rounded hover:bg-gray-200 text-gray-600" onClick={() => moveQuestion(test.id, i, 1)} disabled={i === test.questionsList.length - 1}><ChevronDown size={16} /></button>
                        <button className="p-1 rounded hover:bg-gray-200 text-blue-600" onClick={() => handleEditQuestion(test, i)}><Edit size={16} /></button>
                        <button className="p-1 rounded hover:bg-gray-200 text-gray-600" onClick={() => copyQuestion(test.id, i)}><Copy size={16} /></button>
                        <button className="p-1 rounded hover:bg-gray-200 text-red-600" onClick={() => handleDeleteQuestion(test.id, i)}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })()}

        {/* Add/Edit Question Modal */}
        {showQuestionModal && selectedTest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-xl">
                <h3 className="text-lg font-bold text-gray-800">
                  {editQuestionIndex !== null ? 'Edit Question' : 'Add Question'} — {selectedTest.name}
                </h3>
                <button onClick={() => setShowQuestionModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <form onSubmit={handleQuestionSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Question *</label>
                  <textarea value={questionForm.question} onChange={e => setQuestionForm({ ...questionForm, question: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm resize-none" rows={3} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Option A *</label>
                    <div className="flex gap-2 items-center">
                      <input value={questionForm.optionA} onChange={e => setQuestionForm({ ...questionForm, optionA: e.target.value })}
                        className="flex-1 px-3 py-2 border rounded-lg text-sm" required />
                      <input type="radio" name="correct" checked={questionForm.correctAnswer === 'A'}
                        onChange={() => setQuestionForm({ ...questionForm, correctAnswer: 'A' })} className="w-4 h-4" title="Correct answer" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Option B *</label>
                    <div className="flex gap-2 items-center">
                      <input value={questionForm.optionB} onChange={e => setQuestionForm({ ...questionForm, optionB: e.target.value })}
                        className="flex-1 px-3 py-2 border rounded-lg text-sm" required />
                      <input type="radio" name="correct" checked={questionForm.correctAnswer === 'B'}
                        onChange={() => setQuestionForm({ ...questionForm, correctAnswer: 'B' })} className="w-4 h-4" title="Correct answer" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Option C</label>
                    <div className="flex gap-2 items-center">
                      <input value={questionForm.optionC} onChange={e => setQuestionForm({ ...questionForm, optionC: e.target.value })}
                        className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                      <input type="radio" name="correct" checked={questionForm.correctAnswer === 'C'}
                        onChange={() => setQuestionForm({ ...questionForm, correctAnswer: 'C' })} className="w-4 h-4" title="Correct answer" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Option D</label>
                    <div className="flex gap-2 items-center">
                      <input value={questionForm.optionD} onChange={e => setQuestionForm({ ...questionForm, optionD: e.target.value })}
                        className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                      <input type="radio" name="correct" checked={questionForm.correctAnswer === 'D'}
                        onChange={() => setQuestionForm({ ...questionForm, correctAnswer: 'D' })} className="w-4 h-4" title="Correct answer" />
                    </div>
                  </div>
                </div>
                <div className="w-48">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Marks</label>
                  <input type="number" value={questionForm.marks} onChange={e => setQuestionForm({ ...questionForm, marks: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg text-sm" min={1} required />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowQuestionModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-semibold">
                    Cancel
                  </button>
                  <button type="submit"
                    className="flex-1 px-4 py-2 rounded-lg bg-[#196d83] text-white hover:bg-[#196d83]/90 text-sm font-semibold">
                    {editQuestionIndex !== null ? 'Update Question' : 'Add Question'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
