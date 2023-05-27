import axios from "axios";
import headerService from "./header.service";

const register = ( userName, password, name, gender, dateOfBirth, address, partnerType, company = null) =>(
    axios.post(`${process.env.REACT_APP_API_URL}/Partner/Register`,{
        account: {
            userName, password, name, gender, dateOfBirth, address
        },partnerType,
        company
    })
);

    


const verifyRegister = (otpValue, userId) =>(
    axios.post(`${process.env.REACT_APP_API_URL}/Partner/VerifyRegister/${userId}`,{
        otpValue
    })
);

const login = (userName, password) => (
     axios.post(`${process.env.REACT_APP_API_URL}/Partner/Login`,{
        userName, password
    })
);

const changePassword = (oldPassword, newPassword) => (
    axios.post(`${process.env.REACT_APP_API_URL}/Partner/ChangePassword`,{
        oldPassword, newPassword
   }, { 
    headers: headerService.accessToken() 
})
);

const ResetPassword = (userName, newPassword) => (
    axios.post(`${process.env.REACT_APP_API_URL}/Partner/ResetPassword`,{
        userName, newPassword
   }, { 
    headers: headerService.accessToken() 
})
);

const VerifyResetPassword = (userName, otp) => (
    axios.post(`${process.env.REACT_APP_API_URL}/Partner/VerifyResetPassword`,{
        userName, otp
   }, { 
    headers: headerService.accessToken() 
})
);



const refreshToken = (token) => (
     axios.post(`${process.env.REACT_APP_API_URL}/Partner/RefreshToken`,{
        token
    }, { 
        headers: headerService.accessToken() 
    })
);

const Logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
}

  const partnerService = {
    register,
    verifyRegister,
    login,
    refreshToken,
    Logout,
    changePassword, 
    ResetPassword,    
    VerifyResetPassword
  }


export default partnerService