import "./Card.css";

export default function Card({
  title = "",
  subtitle = "",
  primaryAction = null,
  secondaryActions = null,
  filterActions = null,
  bg = "secondary.card",
  color = "gray.800",
  children,
}) {
  let actions = [];

  if (primaryAction) {
    actions.push(
      <button
        key="0"
        onClick={primaryAction.onClick}
        className="button"
        style={{ backgroundColor: "main" }}
      >
        {primaryAction.content}
      </button>
    );
  }

  if (secondaryActions) {
    actions.push(
      secondaryActions.map((action, i) => (
        <button
          key={i}
          onClick={action.onClick}
          className="button"
          style={{ backgroundColor: "main", border: "1px solid" }}
        >
          {action.content}
        </button>
      ))
    );
  }

  if (filterActions) {
    actions.push(
      filterActions.map((action, i) => (
        <select key={i} onChange={action.onClick} className="select">
          {Object.keys(action.items).map((value, index) => (
            <option key={index} value={value}>
              {action.items[value]}
            </option>
          ))}
        </select>
      ))
    );
  }

  const header =
    title || subtitle || actions.length > 0 ? (
      <div className="header">
        <div>
          <h2 className="title">{title}</h2>
          <h3 className="subtitle">{subtitle}</h3>
        </div>
        <div className="actions">{actions}</div>
      </div>
    ) : null;

  return (
    <div className="card" style={{ backgroundColor: bg, color: color }}>
      {header}
      <div className="content">{children}</div>
    </div>
  );
}
