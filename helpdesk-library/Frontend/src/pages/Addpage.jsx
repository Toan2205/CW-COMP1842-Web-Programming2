import { useNavigate } from 'react-router-dom';
import { createIssue } from '../api/helpdeskApi';
import IssueForm from '../components/IssueForm';

const AddPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createIssue(formData);
      navigate('/');
    } catch {
      alert('Failed to create issue. Please try again.');
    }
  };

  return (
    <div className="page">
      <div className="form-page-container">
        <div className="form-page-header">
          <button className="btn-back" onClick={() => navigate('/')}>← Back</button>
          <h1>➕ Add New Issue</h1>
        </div>
        <IssueForm onSubmit={handleSubmit} submitLabel="➕ Create Issue" />
      </div>
    </div>
  );
};

export default AddPage;
