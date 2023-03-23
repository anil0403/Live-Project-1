import { createVoter, updateRawData } from "../Api/ApiHandler";

const RawVoter = ({ data, img1, img2, refreshHandler, token }) => {
  const { name, address, email, citizenshipid, dob, password, v_id } = data;

  const approveHandler = async () => {
    console.log("approve");
    try {
      const { message } = await createVoter(
        name,
        address,
        email,
        citizenshipid,
        dob.substring(0, 10),
        password
      );
      console.log(message);
      const response = await updateRawData(v_id, token);
      console.log(response.data);
      refreshHandler();
    } catch (error) {
      console.error(error);
    }
  };

  const removeHandler = async () => {
    console.log("remove");
    try {
      const response = await updateRawData(v_id, token);
      console.log(response.data);
      refreshHandler();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="raw-voter-container">
      <div className="voter-raw">
        <div className="info">
          <p>Name: {name}</p>
          <p>Address: {address}</p>
          <p>Email: {email}</p>
          <p>Date of Birth: {dob.substring(0, 10)}</p>
          <p>Citizenship Id: {citizenshipid}</p>
        </div>
        <div className="image-container">
          <div className="image-item">
            <h3>Front Image</h3>
            <a href={img1} target="_blank" rel="noreferrer">
              <img src={img1} alt="frontimage" />
            </a>
          </div>
          <div className="image-item">
            <h3>Back Image</h3>
            <a href={img2} target="_blank" rel="noreferrer">
              <img src={img2} alt="backimage" />
            </a>
          </div>
        </div>
      </div>
      <div className="btn">
        <button className="btn-approve" onClick={approveHandler}>
          Approve
        </button>
        <button className="btn-remove" onClick={removeHandler}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default RawVoter;
