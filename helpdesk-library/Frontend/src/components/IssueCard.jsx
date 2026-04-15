import { useNavigate } from 'react-router-dom';

const IssueCard = ({ issue, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="issue-card">
      <div className="issue-card-header">
        <span className="issue-code">{issue.issueCode}</span>
      </div>
      <div className="issue-card-body">
        <p className="issue-response">{issue.response}</p>
        <p className="issue-description">📝 {issue.description}</p>
      </div>
      <div className="issue-card-actions">
        <button
          className="btn btn-view"
          onClick={() => navigate(`/detail/${issue._id}`)}
        >
           View
        </button>
        <button
          className="btn btn-edit"
          onClick={() => navigate(`/edit/${issue._id}`)}
        >
           Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(issue._id)}
        >
           Delete
        </button>
      </div>
    </div>
  );
};

export default IssueCard;
