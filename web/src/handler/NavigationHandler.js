import { useNavigate } from 'react-router-dom';

const NavigationHandler = () => {
    const navigate = useNavigate();

    const navigateToOrderPage = () => {
        navigate("/orders");
    }
  return { navigateToOrderPage };
}

export default NavigationHandler