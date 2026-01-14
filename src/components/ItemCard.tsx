interface ItemCardProps {
    name: string;
    icon?: string;
    price?: number;
    description?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, icon, price, description }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            {icon && <img src={icon} alt={name} style={{ width: '50px', height: '50px' }} />}
            <h3>{name}</h3>
            {price && <p>Prezzo: {price} coin</p>}
            {description && <p>{description}</p>}
        </div>
    );
};

export default ItemCard;
