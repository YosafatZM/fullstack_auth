import { useState } from "react";
import ItemsForm from "../components/ItemsForm";
import ItemsList from "../components/ItemsList";

const ItemsPage = () => {
    const [selected, setSelected] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const handleSuccess = () => {
        setSelected(null);
        setRefresh(prev => prev + 1);
    };
    
    return (
        <div className="container py-4">
            <h3 className="mb-4">Manajemen Item</h3>
            <ItemsForm 
                item={selected}
                onSuccess={handleSuccess}
            />
            <ItemsList
                key={refresh}
                onEdit={setSelected}
            />
        </div>
    );
};

export default ItemsPage;