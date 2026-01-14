interface StatDisplayProps {
    label: string;
    value: string | number;
    icon?: string;
    color?: string;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value, icon, color }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
            {icon && <img src={icon} alt={label} style={{ width: '20px', height: '20px', marginRight: '8px' }} />}
            <span style={{ color }}>{label}: {value}</span>
        </div>
    );
};

export default StatDisplay;