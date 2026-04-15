import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getIssueById } from '../api/helpdeskApi';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await getIssueById(id);
        setIssue(res.data);
      } catch {
        alert('Issue not found.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);

  if (loading) return <div className="page"><p className="status-msg">Loading...</p></div>;

  return (
    <div className="page">
      <div className="detail-container">
        <button className="btn-back" onClick={() => navigate('/')}>← Back</button>

        <div className="detail-card">
          <div className="detail-header">
            <span className="issue-code-badge">{issue.issueCode}</span>
            <button className="btn-edit-detail" onClick={() => navigate(`/edit/${issue._id}`)}>
              ✏️ Edit
            </button>
          </div>

          <section className="detail-section">
            <h3>📢 Standard Response</h3>
            <p>{issue.response}</p>
          </section>

          <section className="detail-section">
            <h3>📝 Internal Description</h3>
            <p>{issue.description}</p>
          </section>

          <div className="detail-meta">
            <span>ID: {issue._id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
