import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { doLogout } from '~/store/slice/authSlice';

const useLogout = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const segment = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');

        dispatch(doLogout());
        queryClient.resetQueries();
    };
    return handleLogout;
};

export default useLogout;
