import "./title.css";

export const Title = ({title}) => {
  return (
    <div className="title">
      <div className="text-wrapper">{title}</div>
    </div>
  );
};
