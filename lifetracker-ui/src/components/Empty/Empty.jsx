export default function Empty({ children }) {
  return (
    <div className="empty">
      <h2 className="heading">Nothing here yet.</h2>
      {children}
    </div>
  );
}
