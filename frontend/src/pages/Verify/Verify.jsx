import { useNavigate, useSearchParams } from "react-router-dom";
import { url } from "../../assets/assets";
import axios from "axios";
import "./Verify.css";
import { useEffect } from "react";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(`${url}/api/order/verify`, {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
    };
    
    useEffect(() => {
        verifyPayment();
    }, [])

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;