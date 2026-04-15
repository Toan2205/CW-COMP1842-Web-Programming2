import { useEffect, useState } from 'react';
import { getAllIssues, deleteIssue } from '../api/helpdeskApi';
import IssueCard from '../components/IssueCard';

const HomePage = () => {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchIssues = async () => {
    try {
      const res = await getAllIssues();
      setIssues(res.data);
    } catch (err) {
      setError('Failed to load issues. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this issue?')) return;
    try {
      await deleteIssue(id);
      setIssues((prev) => prev.filter((issue) => issue._id !== id));
    } catch {
      alert('Failed to delete issue.');
    }
  };

  const filtered = issues.filter((issue) =>
    issue.issueCode.toLowerCase().includes(search.toLowerCase()) ||
    issue.response.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>📋 All Issues</h1>
        <span className="issue-count">{filtered.length} issue{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <input
        className="search-bar"
        type="text"
        placeholder="🔍 Search by issue code or response..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p className="status-msg">Loading...</p>}
      {error && <p className="status-msg error">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="status-msg">No issues found.</p>
      )}

      <div className="issue-grid">
        {filtered.map((issue) => (
          <IssueCard key={issue._id} issue={issue} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
