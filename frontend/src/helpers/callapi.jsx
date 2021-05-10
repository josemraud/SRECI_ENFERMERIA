/**
 * @author Jose Raudales
 * @version 1.0.0
 * @description Metodo Call API
 */
 
 
 // const baseURI = process.env.REACT_APP_API_URL;
 const baseURI = "http://localhost:3001/api";
 
 export const callAPISinToken = async (endPoint, data, method = "GET") => {
  const url = `${baseURI}/${endPoint}`;

  if (method === "GET") {
    const resp = await fetch(url);

    return await resp.json();
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await resp.json();
  }
};