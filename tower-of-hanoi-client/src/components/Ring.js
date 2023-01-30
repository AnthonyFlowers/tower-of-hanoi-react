export default function Ring({ size, active }) {
  return (
    <div
      className={`ring${active ? " active" : ""}`}
      style={{ width: `${size}em` }}
    >
      {size}
    </div>
  );
}
