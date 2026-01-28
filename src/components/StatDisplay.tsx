/**
 * Props for the StatDisplay component
 * @property {string} label - The label/name of the statistic
 * @property {string | number} value - The value of the statistic
 * @property {string} [icon] - Optional URL of an icon to display
 * @property {string} [color] - Optional CSS color for the text
 */
interface StatDisplayProps {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
}

/**
 * Component for displaying a single statistic with an optional icon and custom color.
 * Used throughout the app to show player stats, profile info, etc.
 *
 * @param {StatDisplayProps} props - Component props
 * @returns {JSX.Element} A styled div containing the stat label and value
 */
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
