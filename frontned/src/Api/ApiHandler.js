import axios from "axios";

const baseurl = process.env.REACT_APP_API_URL;

// admin login
export const adminLogin = async (username, password) => {
  return await axios({
    method: "POST",
    url: baseurl + "/admin-login",
    data: {
      username: username,
      password: password,
    },
  }).then((response) => {
    return response.data;
  });
};

// create admin
export const createAdmin = async (username, password, token) => {
  console.log(token);
  return await axios({
    method: "POST",
    url: baseurl + "/create-admin",
    data: {
      username: username,
      password: password,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// get admin
export const getAdmin = async (token) => {
  console.log(token);
  return await axios({
    method: "GET",
    url: baseurl + "/get-admin",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};
// delete admin
export const deleteAdmin = async (id, token) => {
  console.log(token);
  return await axios({
    method: "DELETE",
    url: baseurl + "/delete-admin",
    data: {
      id: id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};
// create party
export const createParty = async (name, token) => {
  return await axios({
    method: "POST",
    url: baseurl + "/create-party",
    data: {
      name: name,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// get party
export const getParty = async (token) => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-party",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
  }).then((response) => {
    return response.data;
  });
};

// delete party
export const deleteParty = async (p_id, token) => {
  return await axios({
    method: "DELETE",
    url: baseurl + "/delete-party",
    data: {
      p_id: p_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};
// create category
export const createCategory = async (name, token) => {
  return await axios({
    method: "POST",
    url: baseurl + "/create-category",
    data: {
      name: name,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// get category
export const getCategory = async () => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-category",
    responseType: "json",
  }).then((response) => {
    return response.data;
  });
};

// delete category
export const deleteCategory = async (c_id, token) => {
  // console.log(`id = ${c_id}`);

  return await axios({
    method: "DELETE",
    url: baseurl + "/delete-category",
    data: {
      c_id: c_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};
// create candidate
export const createCandidate = async (
  name,
  address,
  citizenshipid,
  dob,
  c_id,
  p_id,
  token
) => {
  return await axios({
    method: "POST",
    url: baseurl + "/create-candidate",
    data: {
      name: name,
      address: address,
      citizenshipid: citizenshipid,
      dob: dob,
      c_id: c_id,
      p_id: p_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// get candidate
export const getCandidate = async (token) => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-candidate",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
  }).then((response) => {
    return response.data;
  });
};

// get full candidate
export const getFullCandidate = async (token) => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-full-candidate",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
  }).then((response) => {
    return response.data;
  });
};

// delete candidate
export const deleteCandidate = async (ca_id, token) => {
  return await axios({
    method: "DELETE",
    url: baseurl + "/delete-candidate",
    data: {
      ca_id: ca_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// create voter
export const createVoter = async (
  name,
  address,
  email,
  citizenshipid,
  dob,
  password
) => {
  return await axios({
    method: "POST",
    url: baseurl + "/create-voter",
    data: {
      name: name,
      address: address,
      email: email,
      citizenshipid: citizenshipid,
      dob: dob,
      password: password,
    },
  }).then((response) => {
    return response.data;
  });
};

// get voter
export const getVoter = async (token) => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-voter",
    responseType: "json",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};
//get voter by voter id
// export const getVoterByVoterId = async (voter_id, token) => {
//   return await axios({
//     method: "GET",
//     url: baseurl + "/get-voter-by-voter-id",
//     responseType: "json",
//     data: {
//       voter_id: voter_id,
//     },
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((response) => {
//     console.log(response.data);
//     return response.data;
//   });
// };

// get voter by email
export const getVoterByEmail = async (email) => {
  return await axios({
    method: "POST",
    url: baseurl + "/get-voter-by-email",
    responseType: "json",
    data: {
      email: email,
    },
  }).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

// update voter by voter address

export const updateVoterByVoterAddress = async (voter_address, token) => {
  return await axios({
    method: "PATCH",
    url: baseurl + "/update-voter-by-voter-address",
    responseType: "json",
    data: {
      voter_address: voter_address,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

// delete voter
export const deleteVoter = async (v_id, token) => {
  return await axios({
    method: "DELETE",
    url: baseurl + "/delete-voter",
    data: {
      v_id: v_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// usr login
export const userLogin = async (email, password) => {
  return await axios({
    method: "POST",
    url: baseurl + "/user-login",
    data: {
      email: email,
      password: password,
    },
  }).then((response) => {
    // console.log(response.data);
    return response.data;
  });
};

// transacation broadcast
export const transactionBraodcast = async (transaction, token) => {
  console.log(`transaction =  ${transaction}`);
  return await axios({
    method: "POST",
    url: baseurl + "/transaction-broadcast",
    data: {
      transaction: transaction,
      token: token,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// vote count
export const countVote = async (token) => {
  return await axios({
    method: "GET",
    url: baseurl + "/count-vote",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// get-vote

export const getVote = async () => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-vote",
    responseType: "json",
  }).then((response) => {
    return response.data;
  });
};

// delete vote

export const deleteVote = async (token) => {
  return await axios({
    method: "DELETE",
    url: baseurl + "/delete-vote",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

//broadcast
export const registeAndBroadcastNode = async (newNodeUrl, token) => {
  return await axios({
    method: "POST",
    url: baseurl + "/boradcast",
    data: {
      newNodeUrl: newNodeUrl,
      token: token,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// get newtork nodes
export const getNetworkNodes = async (token) => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-network-nodes",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

//
export const sotreData = async (formData) => {
  // console.log(formData);
  return await axios({
    method: "POST",
    url: baseurl + "/store-raw-voter",
    responseType: "json",
    data: formData,
  }).then((response) => {
    return response.data;
  });
};

export const getRawData = async (token) => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-raw-data",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "image/png",
    },
  }).then((response) => {
    console.log(response.data)
    return response.data;

  });
};

export const updateRawData = async (v_id, token) => {
  return await axios({
    method: "PATCH",
    url: baseurl + "/update-raw-data",
    data: {
      v_id: v_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
  }).then((response) => {
    return response.data;
  });
};
