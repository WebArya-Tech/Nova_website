
import React, { useState, useEffect } from 'react';
import { runningClassesApi } from '../../api/runningClassesApi';
import toast from 'react-hot-toast';
import { Eye, BookOpen, Edit, Trash2 } from 'lucide-react';

const DEFAULT_CLASSES = [
  { 
    id: 1, 
    subject: 'UG Mathematics', 
    level: 'Undergraduate', 
    instructor: 'Ms. Neha Aggarwal', 
    schedule: 'Mon, Wed, Fri - 6:00 PM IST', 
    maxCapacity: 15,
    currentEnrollment: 1,
    description: 'Comprehensive mathematics coverage for B.Sc and B.Tech students',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    duration: '12 weeks',
    topics: 'Calculus, Linear Algebra, Differential Equations',
    difficultyLevel: 'Intermediate',
    prerequisites: 'Basic Mathematics',
    demoLink: '',
    meetingLink: '',
    image: '', 
    status: 'Active', 
    approvedEnrollments: [
      {
        enrollmentNo: 'ENROLL1172345',
        fullName: 'Rahul Kumar',
        email: 'rahul.kumar@example.com',
        phone: '+91-9876543210',
        classSubject: 'UG Mathematics',
        specialRequirements: 'Prefer morning sessions if possible',
        enrollmentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Approved'
      }
    ],
    allEnrollments: []
  },
  { 
    id: 2, 
    subject: 'UG Physics', 
    level: 'Undergraduate', 
    instructor: 'Mr. Arvind', 
    schedule: 'Tue, Thu - 5:30 PM IST', 
    maxCapacity: 12,
    currentEnrollment: 0,
    description: 'Advanced physics concepts with real-world applications', 
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    duration: '10 weeks',
    topics: 'Mechanics, Thermodynamics, Waves and Optics',
    difficultyLevel: 'Intermediate',
    prerequisites: 'Basic Physics',
    demoLink: '',
    meetingLink: '',
    image: '', 
    status: 'Active',
    approvedEnrollments: [],
    allEnrollments: []
  },
  { 
    id: 3, 
    subject: 'UG Chemistry', 
    level: 'Undergraduate', 
    instructor: 'Dr. Priya', 
    schedule: 'Mon, Wed - 4:00 PM IST', 
    maxCapacity: 10,
    currentEnrollment: 0,
    description: 'Organic, inorganic and physical chemistry', 
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    duration: '10 weeks',
    topics: 'Organic Chemistry, Inorganic Chemistry, Physical Chemistry',
    difficultyLevel: 'Intermediate',
    prerequisites: 'Basic Chemistry',
    demoLink: '',
    meetingLink: '',
    image: '', 
    status: 'Active',
    approvedEnrollments: [],
    allEnrollments: []
  },
  { 
    id: 4, 
    subject: 'GRE Preparation', 
    level: 'Professional', 
    instructor: 'Mr. Rajan', 
    schedule: 'Sat, Sun - 10:00 AM IST', 
    maxCapacity: 8,
    currentEnrollment: 0,
    description: 'Complete GRE verbal and quantitative prep', 
    startDate: '2024-06-15',
    endDate: '2024-09-15',
    duration: '12 weeks',
    topics: 'Verbal Reasoning, Quantitative Reasoning, Analytical Writing',
    difficultyLevel: 'Advanced',
    prerequisites: 'Basic English and Math',
    demoLink: '',
    meetingLink: '',
    image: '', 
    status: 'Active',
    approvedEnrollments: [],
    allEnrollments: []
  },
];

const EMPTY_FORM = {
  subject: '',
  level: 'Undergraduate',
  instructor: '',
  schedule: '',
  maxCapacity: '15',
  currentEnrollment: '0',
  description: '',
  startDate: '',
  endDate: '',
  duration: '',
  topics: '',
  difficultyLevel: 'Intermediate',
  prerequisites: '',
  demoLink: '',
  meetingLink: '',
  image: '',
  status: 'Active',
  approvedEnrollments: [],
  allEnrollments: [],
};

export default function RunningClassesManagement() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [enrollmentRequests, setEnrollmentRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [enrollmentPage, setEnrollmentPage] = useState(1);
  const [selectedClassForDetails, setSelectedClassForDetails] = useState(null);
  const [showClassDetailsModal, setShowClassDetailsModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [showEnrollmentDetailsModal, setShowEnrollmentDetailsModal] = useState(false);
  const [selectedEnrollmentClass, setSelectedEnrollmentClass] = useState('all');
  const itemsPerPage = 100;

  const totalPages = Math.ceil(classes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClasses = classes.slice(startIndex, startIndex + itemsPerPage);

  const getClassEnrollmentCount = (classItem) => {
    const approvedCount = classItem.approvedEnrollments?.length || 0;
    const matchingApprovedRequests = enrollmentRequests.filter(
      (req) => req.classSubject === classItem.subject && req.status === 'Approved'
    ).length;

    return Math.max(Number(classItem.currentEnrollment) || 0, approvedCount, matchingApprovedRequests);
  };

  const filteredEnrollmentRequests = selectedEnrollmentClass === 'all'
    ? enrollmentRequests
    : enrollmentRequests.filter((req) => req.classSubject === selectedEnrollmentClass);

  const enrollmentTotalPages = Math.ceil(filteredEnrollmentRequests.length / itemsPerPage);
  const enrollmentStartIndex = (enrollmentPage - 1) * itemsPerPage;
  const paginatedEnrollments = filteredEnrollmentRequests.slice(enrollmentStartIndex, enrollmentStartIndex + itemsPerPage);

  // Fetch classes from backend; fall back to defaults if unavailable
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await runningClassesApi.getAll();
      const data = res.data?.data || res.data || [];
      setClasses(Array.isArray(data) && data.length > 0 ? data : DEFAULT_CLASSES);
      // Keep localStorage in sync for other pages
      localStorage.setItem('icfy_running_classes', JSON.stringify(
        Array.isArray(data) && data.length > 0 ? data : DEFAULT_CLASSES
      ));
    } catch {
      // API unavailable — load from localStorage or use defaults
      try {
        const saved = JSON.parse(localStorage.getItem('icfy_running_classes') || 'null');
        setClasses(saved && saved.length > 0 ? saved : DEFAULT_CLASSES);
      } catch {
        setClasses(DEFAULT_CLASSES);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClasses(); }, []);

  // Load enrollment requests from localStorage
  useEffect(() => {
    let enrollments = JSON.parse(localStorage.getItem('runningClassEnrollments') || '[]');
    
    // Add sample enrollment if none exist
    if (enrollments.length === 0) {
      enrollments = [
        {
          id: 'ENROLL1172345',
          enrollmentNo: 'ENROLL1172345',
          fullName: 'Rahul Kumar',
          email: 'rahul.kumar@example.com',
          phone: '+91-9876543210',
          classSubject: 'UG Mathematics',
          specialRequirements: 'Prefer morning sessions if possible',
          enrollmentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Approved'
        }
      ];
      localStorage.setItem('runningClassEnrollments', JSON.stringify(enrollments));
    }
    
    setEnrollmentRequests(enrollments);
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await runningClassesApi.update(editId, form);
        toast.success('Class updated successfully');
      } else {
        await runningClassesApi.create(form);
        toast.success('Class created successfully');
      }
      await fetchClasses();
    } catch {
      // API failed — update locally and persist to localStorage
      if (editId) {
        const updated = classes.map(c =>
          c.id === editId ? { ...form, id: editId, enrolledStudents: c.enrolledStudents || [] } : c
        );
        setClasses(updated);
        localStorage.setItem('icfy_running_classes', JSON.stringify(updated));
        toast.success('Class updated (offline mode)');
      } else {
        const newClass = { ...form, id: Date.now(), enrolledStudents: [] };
        const updated = [...classes, newClass];
        setClasses(updated);
        localStorage.setItem('icfy_running_classes', JSON.stringify(updated));
        toast.success('Class created (offline mode)');
      }
    } finally {
      setSaving(false);
    }
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (c) => {
    setForm({
      subject: c.subject,
      level: c.level,
      instructor: c.instructor,
      schedule: c.schedule,
      maxCapacity: String(c.maxCapacity || c.students || '15'),
      currentEnrollment: String(c.currentEnrollment || c.approvedEnrollments?.length || 0),
      description: c.description,
      startDate: c.startDate || '',
      endDate: c.endDate || '',
      duration: c.duration || '',
      topics: c.topics || '',
      difficultyLevel: c.difficultyLevel || 'Intermediate',
      prerequisites: c.prerequisites || '',
      demoLink: c.demoLink || '',
      meetingLink: c.meetingLink || '',
      image: c.image || '',
      status: c.status,
      approvedEnrollments: c.approvedEnrollments || [],
      allEnrollments: c.allEnrollments || [],
    });
    setEditId(c.id);
    setShowForm(true);
    setShowClassDetailsModal(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this class?')) return;
    try {
      await runningClassesApi.delete(id);
      toast.success('Class deleted successfully');
      await fetchClasses();
    } catch {
      const updated = classes.filter(c => c.id !== id);
      setClasses(updated);
      localStorage.setItem('icfy_running_classes', JSON.stringify(updated));
      toast.success('Class deleted (offline mode)');
    }
    setShowClassDetailsModal(false);
    setSelectedClassForDetails(null);
  };

  const handleApproveEnrollment = (enrollmentId) => {
    // Update enrollment request status
    const updated = enrollmentRequests.map(req =>
      req.id === enrollmentId ? { ...req, status: 'Approved' } : req
    );
    setEnrollmentRequests(updated);
    localStorage.setItem('runningClassEnrollments', JSON.stringify(updated));

    // Find the enrollment and add to the class's approvedEnrollments
    const enrollment = updated.find(e => e.id === enrollmentId);
    if (enrollment) {
      const updatedClasses = classes.map(c => {
        if (c.subject === enrollment.classSubject) {
          return {
            ...c,
            approvedEnrollments: [...(c.approvedEnrollments || []), enrollment],
            currentEnrollment: (c.currentEnrollment || c.approvedEnrollments?.length || 0) + 1
          };
        }
        return c;
      });
      setClasses(updatedClasses);
      localStorage.setItem('icfy_running_classes', JSON.stringify(updatedClasses));
    }
    toast.success('Enrollment approved and student added to class');
  };

  const handleRejectEnrollment = (enrollmentId) => {
    const updated = enrollmentRequests.map(req =>
      req.id === enrollmentId ? { ...req, status: 'Rejected' } : req
    );
    setEnrollmentRequests(updated);
    localStorage.setItem('runningClassEnrollments', JSON.stringify(updated));
    toast.success('Enrollment rejected');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-blue-900">Running Classes Management</h2>
        <p className="text-gray-500 text-xs md:text-sm mt-1">Manage currently running classes, schedules, and student enrollments</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-3 md:p-6 lg:p-8">
        <button
          className="w-full sm:w-auto mb-4 px-3 md:px-4 py-2 md:py-2.5 rounded font-bold text-white bg-blue-900 disabled:opacity-60 text-sm hover:bg-blue-800 transition"
          disabled={saving}
          onClick={() => {
            setShowForm(!showForm);
            setForm(EMPTY_FORM);
            setEditId(null);
          }}
        >
          {showForm ? 'Cancel' : '+ Add Running Class'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 bg-blue-50 p-4 md:p-6 rounded-lg">
            <div className="sm:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-bold text-blue-900 mb-4">{editId ? 'Edit Class' : 'Add New Running Class'}</h3>
            </div>
            
            {/* Basic Information */}
            <input
              name="subject"
              value={form.subject}
              onChange={handleInputChange}
              placeholder="Subject Name (e.g., UG Mathematics)"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            <select
              name="level"
              value={form.level}
              onChange={handleInputChange}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            >
              <option value="Undergraduate">Undergraduate</option>
              <option value="Post-Graduate">Post-Graduate</option>
              <option value="Professional">Professional</option>
            </select>
            
            <input
              name="instructor"
              value={form.instructor}
              onChange={handleInputChange}
              placeholder="Instructor Name"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            
            <select
              name="difficultyLevel"
              value={form.difficultyLevel}
              onChange={handleInputChange}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>

            {/* Dates & Duration */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <input
              name="duration"
              value={form.duration}
              onChange={handleInputChange}
              placeholder="Duration (e.g., 12 weeks)"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />

            <input
              name="schedule"
              value={form.schedule}
              onChange={handleInputChange}
              placeholder="Schedule (e.g., Mon, Wed, Fri - 6:00 PM IST)"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />

            {/* Capacity & Enrollment */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1">Max Capacity</label>
              <input
                type="number"
                name="maxCapacity"
                value={form.maxCapacity}
                onChange={handleInputChange}
                placeholder="15"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                min="1"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1">Current Enrollment (Auto)</label>
              <input
                type="text"
                value={form.currentEnrollment}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
                disabled
              />
            </div>

            {/* Topics & Prerequisites */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-1">Topics Covered</label>
              <input
                name="topics"
                value={form.topics}
                onChange={handleInputChange}
                placeholder="e.g., Calculus, Linear Algebra, Differential Equations"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-1">Prerequisites</label>
              <input
                name="prerequisites"
                value={form.prerequisites}
                onChange={handleInputChange}
                placeholder="e.g., Basic Mathematics, High school Chemistry"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            {/* Description */}
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Class Description"
              className="w-full md:col-span-2 px-4 py-2 border border-gray-300 rounded"
              rows="3"
              required
            />

            {/* Links */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-1">Demo Class Link</label>
              <input
                name="demoLink"
                value={form.demoLink}
                onChange={handleInputChange}
                placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-1">Regular Meeting Link</label>
              <input
                name="meetingLink"
                value={form.meetingLink}
                onChange={handleInputChange}
                placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            {/* Status */}
            <select
              name="status"
              value={form.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              type="submit"
              disabled={saving}
              className="md:col-span-2 px-4 py-2 rounded text-white font-bold bg-blue-900 hover:bg-blue-800 disabled:opacity-60"
            >
              {saving ? 'Saving...' : editId ? 'Update Class' : 'Create Class'}
            </button>
          </form>
        )}

        {loading ? (
          <div className="text-center py-10 text-blue-900 font-semibold">Loading classes...</div>
        ) : classes.length === 0 ? (
          <div className="text-gray-600 text-center py-8">No running classes found.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-xs md:text-sm">
              <thead className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
                <tr>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Subject</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold hidden sm:table-cell">Level</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold hidden md:table-cell">Instructor</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold hidden lg:table-cell">Schedule</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Enrollment</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold hidden sm:table-cell">Duration</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center font-semibold whitespace-nowrap">Difficulty</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center font-semibold whitespace-nowrap">Status</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClasses.map((c) => {
                  const enrolled = c.currentEnrollment || c.approvedEnrollments?.length || 0;
                  const capacity = c.maxCapacity || 15;
                  
                  return (
                    <tr key={c.id} className="hover:bg-blue-50 border-b">
                      <td className="px-2 md:px-4 py-2 md:py-3 font-semibold text-gray-900 truncate">{c.subject}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 hidden sm:table-cell"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded whitespace-nowrap text-xs md:text-sm">{c.level}</span></td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-gray-700 hidden md:table-cell truncate">{c.instructor}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-gray-600 hidden lg:table-cell truncate">{c.schedule}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                        <span className="font-semibold text-gray-700 text-xs md:text-sm">{enrolled}/{capacity}</span>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 hidden sm:table-cell">{c.duration || '-'}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                        <span className={`px-2 py-1 rounded text-white text-xs font-semibold inline-block whitespace-nowrap ${
                          c.difficultyLevel === 'Beginner' ? 'bg-green-600' :
                          c.difficultyLevel === 'Intermediate' ? 'bg-blue-600' :
                          c.difficultyLevel === 'Advanced' ? 'bg-orange-600' :
                          'bg-red-600'
                        }`}>
                          {c.difficultyLevel || 'N/A'}
                        </span>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs md:text-sm font-semibold text-white whitespace-nowrap ${
                            c.status === 'Active' ? 'bg-green-600' : c.status === 'Inactive' ? 'bg-gray-500' : 'bg-blue-600'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                        <button
                          className="px-1.5 md:px-2 py-1 rounded text-white font-bold text-xs bg-blue-600 hover:bg-blue-700 inline-flex items-center justify-center gap-0.5 transition-colors"
                          onClick={() => {
                            setSelectedClassForDetails(c);
                            setShowClassDetailsModal(true);
                          }}
                          title="View Class Details"
                        >
                          <Eye size={14} /> <span className="hidden sm:inline">View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1.5 rounded text-sm font-semibold text-white disabled:opacity-50" style={{ backgroundColor: '#196d83' }}>Previous</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} className="px-3 py-1.5 rounded text-sm font-semibold" style={{ backgroundColor: currentPage === p ? '#196d83' : 'white', color: currentPage === p ? 'white' : '#196d83', border: '2px solid #196d83' }}>{p}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1.5 rounded text-sm font-semibold text-white disabled:opacity-50" style={{ backgroundColor: '#196d83' }}>Next</button>
          </div>
        )}
      </div>
      {/* Enrollment Requests */}
      {enrollmentRequests.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-4 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-blue-900">
                Enrollment Requests ({filteredEnrollmentRequests.length})
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Filter by running class to see class-wise students and requests.
              </p>
            </div>
            <div className="w-full lg:w-80">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Filter by Class</label>
              <select
                value={selectedEnrollmentClass}
                onChange={(e) => {
                  setSelectedEnrollmentClass(e.target.value);
                  setEnrollmentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                <option value="all">All Running Classes ({enrollmentRequests.length})</option>
                {classes.map((classItem) => {
                  const totalRequests = enrollmentRequests.filter((req) => req.classSubject === classItem.subject).length;
                  const studentCount = getClassEnrollmentCount(classItem);

                  return (
                    <option key={classItem.id} value={classItem.subject}>
                      {classItem.subject} - {studentCount} students, {totalRequests} requests
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-xs md:text-sm">
              <thead className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
                <tr>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Enrollment No</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Name</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold hidden sm:table-cell">Email</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold hidden md:table-cell">Phone</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Class</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold hidden lg:table-cell">Date</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center font-semibold">Status</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEnrollments.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 border-b">
                    <td className="px-2 md:px-4 py-2 md:py-3 font-semibold text-gray-900 text-xs md:text-sm">{req.enrollmentNo || req.id}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3 font-semibold text-gray-900 truncate">{req.fullName}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3 hidden sm:table-cell text-gray-700 truncate">{req.email}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3 hidden md:table-cell text-gray-700">{req.phone}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-gray-700 truncate">{req.classSubject}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3 hidden lg:table-cell text-gray-700">{new Date(req.enrollmentDate).toLocaleDateString()}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold text-white whitespace-nowrap ${
                        req.status === 'Approved' ? 'bg-green-600' : req.status === 'Rejected' ? 'bg-red-600' : 'bg-yellow-500'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                      <div className="flex gap-0.5 md:gap-1 justify-center">
                        <button
                          className="px-1.5 md:px-2 py-1 rounded text-white font-bold text-xs bg-blue-600 hover:bg-blue-700 transition-colors inline-flex items-center gap-0.5"
                          onClick={() => {
                            setSelectedEnrollment(req);
                            setShowEnrollmentDetailsModal(true);
                          }}
                          title="View enrollment details"
                        >
                          <Eye size={12} /> <span className="hidden sm:inline">View</span>
                        </button>
                        {req.status === 'Pending' && (
                          <>
                            <button
                              className="px-1.5 md:px-2 py-1 rounded text-white font-bold text-xs bg-green-600 hover:bg-green-700 transition-colors"
                              onClick={() => handleApproveEnrollment(req.id)}
                            >
                              <span className="hidden sm:inline">Approve</span><span className="sm:hidden">✓</span>
                            </button>
                            <button
                              className="px-1.5 md:px-2 py-1 rounded bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors"
                              onClick={() => handleRejectEnrollment(req.id)}
                            >
                              <span className="hidden sm:inline">Reject</span><span className="sm:hidden">✕</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {enrollmentTotalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button onClick={() => setEnrollmentPage(p => Math.max(1, p - 1))} disabled={enrollmentPage === 1} className="px-3 py-1.5 rounded text-sm font-semibold text-white disabled:opacity-50" style={{ backgroundColor: '#196d83' }}>Previous</button>
              {Array.from({ length: enrollmentTotalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setEnrollmentPage(p)} className="px-3 py-1.5 rounded text-sm font-semibold" style={{ backgroundColor: enrollmentPage === p ? '#196d83' : 'white', color: enrollmentPage === p ? 'white' : '#196d83', border: '2px solid #196d83' }}>{p}</button>
              ))}
              <button onClick={() => setEnrollmentPage(p => Math.min(enrollmentTotalPages, p + 1))} disabled={enrollmentPage === enrollmentTotalPages} className="px-3 py-1.5 rounded text-sm font-semibold text-white disabled:opacity-50" style={{ backgroundColor: '#196d83' }}>Next</button>
            </div>
          )}
        </div>
      )}
      
      {/* Class Details Modal */}
      {showClassDetailsModal && selectedClassForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-linear-to-r from-blue-900 to-blue-800 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{selectedClassForDetails.subject}</h2>
                  <p className="text-blue-100 mt-1">{selectedClassForDetails.level} | {selectedClassForDetails.status}</p>
                </div>
                <button
                  onClick={() => setShowClassDetailsModal(false)}
                  className="text-white hover:text-blue-200 text-3xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-blue-600" />
                  Class Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Subject</p>
                    <p className="font-semibold">{selectedClassForDetails.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Level</p>
                    <p className="font-semibold">{selectedClassForDetails.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Instructor</p>
                    <p className="font-semibold">{selectedClassForDetails.instructor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Schedule</p>
                    <p className="font-semibold">{selectedClassForDetails.schedule}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Enrollment</p>
                    <p className="font-semibold">
                      {getClassEnrollmentCount(selectedClassForDetails)} / {selectedClassForDetails.maxCapacity || 15}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">{selectedClassForDetails.duration || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Difficulty</p>
                    <p className="font-semibold">{selectedClassForDetails.difficultyLevel || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold">{selectedClassForDetails.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-semibold">{selectedClassForDetails.startDate || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">End Date</p>
                    <p className="font-semibold">{selectedClassForDetails.endDate || 'N/A'}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Topics Covered</p>
                    <p className="font-semibold">{selectedClassForDetails.topics || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Prerequisites</p>
                    <p className="font-semibold">{selectedClassForDetails.prerequisites || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="font-semibold">{selectedClassForDetails.description || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Demo Class Link</p>
                    {selectedClassForDetails.demoLink ? (
                      <a className="font-semibold text-blue-700 underline break-all" href={selectedClassForDetails.demoLink} target="_blank" rel="noreferrer">
                        {selectedClassForDetails.demoLink}
                      </a>
                    ) : (
                      <p className="font-semibold">N/A</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Regular Meeting Link</p>
                    {selectedClassForDetails.meetingLink ? (
                      <a className="font-semibold text-blue-700 underline break-all" href={selectedClassForDetails.meetingLink} target="_blank" rel="noreferrer">
                        {selectedClassForDetails.meetingLink}
                      </a>
                    ) : (
                      <p className="font-semibold">N/A</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleEdit(selectedClassForDetails)}
                  className="flex-1 px-4 py-2 rounded font-bold text-white bg-blue-600 hover:bg-blue-700 inline-flex items-center justify-center gap-2"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(selectedClassForDetails.id)}
                  className="flex-1 px-4 py-2 rounded font-bold text-white bg-red-600 hover:bg-red-700 inline-flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
                <button
                  onClick={() => setShowClassDetailsModal(false)}
                  className="flex-1 px-4 py-2 rounded font-bold text-white bg-gray-600 hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Details Modal */}
      {showEnrollmentDetailsModal && selectedEnrollment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 md:p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-bold">Enrollment Details</h2>
                <button
                  onClick={() => setShowEnrollmentDetailsModal(false)}
                  className="text-white hover:text-gray-200 transition-colors text-xl font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Enrollment No</label>
                  <p className="text-gray-800 font-semibold text-sm md:text-base">{selectedEnrollment.enrollmentNo || selectedEnrollment.id}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Full Name</label>
                  <p className="text-gray-800 font-semibold text-sm md:text-base">{selectedEnrollment.fullName}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Email</label>
                  <p className="text-gray-800 text-xs md:text-sm break-all">{selectedEnrollment.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Phone</label>
                  <p className="text-gray-800 text-sm md:text-base">{selectedEnrollment.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Class</label>
                  <p className="text-gray-800 font-semibold text-sm md:text-base">{selectedEnrollment.classSubject}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs md:text-sm font-bold text-white ${
                    selectedEnrollment.status === 'Approved' ? 'bg-green-600' : 
                    selectedEnrollment.status === 'Rejected' ? 'bg-red-600' : 
                    'bg-yellow-500'
                  }`}>
                    {selectedEnrollment.status}
                  </span>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Enrollment Date</label>
                  <p className="text-gray-800 text-sm md:text-base">{new Date(selectedEnrollment.enrollmentDate).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedEnrollment.specialRequirements && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">Special Requirements</label>
                  <p className="text-gray-800 text-xs md:text-sm bg-gray-50 p-3 rounded-lg">{selectedEnrollment.specialRequirements}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-4 md:p-6 flex justify-end gap-3">
              <button
                onClick={() => setShowEnrollmentDetailsModal(false)}
                className="px-4 md:px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
