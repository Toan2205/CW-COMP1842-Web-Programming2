import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getIssueById, updateIssue } from '../api/helpdeskApi';
import IssueForm from '../components/IssueForm';

const EditPage = () => {
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

  const handleSubmit = async (formData) => {
    try {
      await updateIssue(id, formData);
      navigate('/');
    } catch {
      alert('Failed to update issue. Please try again.');
    }
  };

  if (loading) return <div className="page"><p className="status-msg">Loading...</p></div>;

  return (
    <div className="page">
      <div className="form-page-container">
        <div className="form-page-header">
          <button className="btn-back" onClick={() => navigate('/')}>← Back</button>
          <h1>✏️ Edit Issue</h1>
        </div>
        <IssueForm initialData={issue} onSubmit={handleSubmit} submitLabel="💾 Save Changes" />
      </div>
    </div>
  );
};

export default EditPage;
