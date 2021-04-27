import { useLocation } from 'react-router-dom';

export const useQueryParam = (): URLSearchParams => {
    return new URLSearchParams(useLocation().search);
};
