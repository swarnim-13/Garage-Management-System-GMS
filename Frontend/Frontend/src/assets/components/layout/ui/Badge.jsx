const Badge = ({ text, color }) => {
  return (
    <span className={`px-2 py-1 text-sm rounded bg-${color}-200`}>
      {text}
    </span>
  );
};

export default Badge;