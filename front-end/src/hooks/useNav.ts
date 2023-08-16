import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function useNav() {
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = useState(false);

    function navigateTo(route: string) {
        setFadeOut(true);
        setTimeout(() => {
            navigate(route);
        }, 200);
    };

    return {fadeOut, navigateTo};
}

export default useNav;