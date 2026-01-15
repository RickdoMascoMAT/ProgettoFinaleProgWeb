interface StatDisplayProps {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value, icon, color }) => {
  return (
    <div className="stat-display">
      {icon && <img src={icon} alt={label} className="stat-icon" />}
      <span style={{ color }}>
        {label}: {value}
      </span>
    </div>
  );
};

export default StatDisplay;
