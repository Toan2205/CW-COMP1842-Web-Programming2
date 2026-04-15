import { useState, useEffect } from 'react';

const IssueForm = ({ initialData, onSubmit, submitLabel }) => {
  const [form, setForm] = useState({
    issueCode: '',
    response: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        issueCode: initialData.issueCode || '',
        response: initialData.response || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!form.issueCode.trim()) newErrors.issueCode = 'Issue Code is required';
    if (!form.response.trim()) newErrors.response = 'Response is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
  };

  return (
    <form className="issue-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="issueCode">Issue Code</label>
        <input
          id="issueCode"
          name="issueCode"
          type="text"
          placeholder="e.g. PWD_RESET"
          value={form.issueCode}
          onChange={handleChange}
          className={errors.issueCode ? 'input-error' : ''}
        />
        {errors.issueCode && <span className="error-msg">{errors.issueCode}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="response">Response</label>
        <textarea
          id="response"
          name="response"
          rows={3}
          placeholder="Standard response to send to the user..."
          value={form.response}
          onChange={handleChange}
          className={errors.response ? 'input-error' : ''}
        />
        {errors.response && <span className="error-msg">{errors.response}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Internal guidance for staff on how to handle this issue..."
          value={form.description}
          onChange={handleChange}
          className={errors.description ? 'input-error' : ''}
        />
        {errors.description && <span className="error-msg">{errors.description}</span>}
      </div>

      <button type="submit" className="btn-submit">
        {submitLabel || 'Submit'}
      </button>
    </form>
  );
};

export default IssueForm;
