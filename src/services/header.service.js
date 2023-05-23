const accessToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.success && user.data && user.data.token && user.data.token.accessToken)  {
    return {
      Authorization: `Bearer ${user.data.token.accessToken}`      
    } 
  }
  return {

  }
}
const refreshToken = () => {
  
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.data && user.data.token && user.data.token.refreshToken)  {
    return {
      Authorization: `Bearer ${user.data.token.refreshToken}`      
    } 
  }
  return {

  }  
}
const userName = () => {
  const account = JSON.parse(localStorage.getItem('user'))
  if(account && account.data && account.data.account.userName){
    return account.data.account.userName
  }  
  return ""  
}
const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(user && user.data && user.data.account) {
    return user.data.account.id;
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
  GetUser, 
  getUserId
}
