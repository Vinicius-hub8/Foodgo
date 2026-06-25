import "./button.css";

export const Button = ({ children, onClick, type = "button", variant = "primary", ...props }) => (
  <button
    type={type}
    onClick={onClick}
    className={`button button-${variant}`}
    {...props}
  >
    {children}
  </button>
);
