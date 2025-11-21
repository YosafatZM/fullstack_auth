import { useState } from "react";
import LaguForm from "../components/LaguForm";
import LaguList from "../components/LaguList";

const LaguPage = () => {
    const [selected, setSelected] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const handleSuccess = () => {
        setSelected(null);
        setRefresh(prev => prev + 1);
    };
    
    return (
        <div className="container py-4">
            <h3 className="mb-4">Manajemen Lagu</h3>
            <LaguForm 
                lagu={selected}
                onSuccess={handleSuccess}
            />
            <LaguList
                key={refresh}
                onEdit={setSelected}
            />
        </div>
    );
};

export default LaguPage;