const md5 = require("md5");

// temporarry data source
let userDataList = [
  // example user
  {
    id: 1,
    username: "test",
    email: "test@gmail.com",
    password: md5("userpassword"),
  },
];

class UserModel {
  // get all users data
  getAllUsers = () => {
    return userDataList;
  };

  // get username from data source
  getUsername = (username) => {
    // looking for the same username as the username from req.body
    const usernameExist = userDataList.find((data) => {
      return data.username === username;
    });
    return usernameExist;
  };

  // check existing data
  dataIsUsed = (requestData) => {
    const existData = userDataList.find((data) => {
      return requestData.username === data.username || requestData.email === data.email;
    });
    return existData;
  };

  // add new data to data source
  addNewUser = (requestData) => {
    // add new data into userDataList
    userDataList.push({
      id: userDataList.length + 1,
      username: requestData.username,
      email: requestData.email,
      password: md5(requestData.password),
    });
  };

  // checking existing user
  getExistingUser = (email, password) => {
    const existUser = userDataList.find((data) => {
      return data.email === email && data.password === md5(password);
    });
    return existUser;
  };

  // checking existing email
  getExistingEmail = (email) => {
    // checking email
    const emailUser = userDataList.find((data) => {
      return data.email === email;
    });
    return emailUser;
  };

  // checking existing password
  getPasswordUser = (password) => {
    // checking password
    const passwordUser = userDataList.find((data) => {
      return data.password === md5(password);
    });
    return passwordUser;
  };
}

module.exports = new UserModel();
