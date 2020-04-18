const UserDB = require("../models/User");
const CryptoJS = require("crypto-js");


module.exports = {
  verifyToken(token){
    return new Promise( async (resolve, reject) =>{
      let regex = /^[a-z0-9]+(?:[_-]?[a-z0-9])*\.[a-zA-Z0-9]+([a-zA-Z0-9])*$/;
      if(!regex.test(token)) return reject("Invalid Token Format");
      token = token.split(".");
      let user = token[0];
      let finalToken = CryptoJS.MD5(token[1]).toString();
      try {
        let userOb = await UserDB.findOne({username: user});
        if(userOb.reseller.token === finalToken) {
          // Matched!
          resolve(userOb);
        } else {
          reject("Invalid Token!");
        }
      } catch (e) {
        console.error("lib/VerifyApiAuth.js", e);
        reject(e)
      }

    })
  }
};
