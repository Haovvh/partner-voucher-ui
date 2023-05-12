const accessToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user && user.data && user.data.accountToken && user.data.accountToken.accessToken)  {
    return {
      Authorization: `Bearer ${user.data.accountToken.accessToken}`      
    } 
  }
  return {

  }
}
const refreshToken = () => {
  
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.data && user.data.accountToken && user.data.accountToken.refreshToken)  {
    return {
      Authorization: `Bearer ${user.data.accountToken.refreshToken}`      
    } 
  }
  return {

  }  
}
const userName = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if(user && user.data && user.data.userName){
    return user.data.userName
  }  
  return ""  
}

const GetUser = () => (
  JSON.parse(localStorage.getItem('user'))
)
export default {
  accessToken,
  refreshToken,
  userName,
  GetUser
}
