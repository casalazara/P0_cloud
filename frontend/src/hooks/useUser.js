
export default function useUser () {

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

    var isLogged = false;
    const token = sessionStorage.getItem("accessToken");
    if (token){
    var decodedToken=parseJwt(token);
    var dateNow = new Date();
    if (decodedToken.exp * 1000 > dateNow.getTime()) 
        isLogged = true;
    }
  return isLogged
}


