import { useNavigate } from 'react-router-dom';

export const useUpdateUrl=(url)=>{
    let navigate = useNavigate();
   navigate(url)
}