import { jwtDecode } from "jwt-decode";

interface Token {
  sub: {
    privileges: string[];
  };
}

export function getDecodedToken(): Token | undefined {
  let token = localStorage.getItem("token");
  if (token) {
    try {
      let decodedToken = jwtDecode<Token>(token);
      if (decodedToken) {
        return decodedToken;
      }
    } catch (InvalidTokenError) {
      localStorage.clear();
      window.location.replace("/");
    }
  }
}
