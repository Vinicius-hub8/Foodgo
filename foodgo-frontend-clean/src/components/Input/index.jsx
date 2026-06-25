import './input.css';

export const Input = ({ label, value, onChange, type = "text", placeholder = "", ...props }) => (
  <div className="input-wrapper">
    {label && <label className="input-label">{label}</label>}
    <input
      className="input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  </div>
);
