import { useState } from "react";
import { getVoterByEmail, sotreData } from "../../Api/ApiHandler";
const Register = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(new Date().toISOString(0, 10));
  const [citizenshipId, setCitizenshipId] = useState("");
  const [alert, setAlert] = useState("");
  const [buttonState, setButtonState] = useState(false);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleFrontImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.match("image.*")) {
      setAlert("Please select an image file (jpg, jpeg, png)");
      console.log("Please select an image file (jpg, jpeg, png)");
      e.target.value = "";
    }
    setFrontImage(e.target.files[0]);
  };

  const handleBackImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.match("image.*")) {
      setAlert("Please select an image file (jpg, jpeg, png)");
      console.log("Please select an image file (jpg, jpeg, png)");
      e.target.value = "";
    }
    setBackImage(e.target.files[0]);
  };

  const multipleVoterHandler = (e) => {
    setEmail(e.target.value);
    getVoterByEmail(e.target.value).then(({ data }) => {
      try {
        if (data.email === e.target.value) {
          setAlert("Voter Already Registered");
        }
      } catch {
        setAlert("");
      }
    });
  };

  const dobRestrictionHandler = (e) => {
    setDob(e.target.value);
    const today = new Date();
    const birthDate = new Date(e.target.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (age < 18) {
      setAlert("You must be at least 18 years old to register to vote.");
      setButtonState(false);
    } else {
      setButtonState(true);
      setAlert("");
    }
  };

  const register = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("citizenshipId", citizenshipId);
    formData.append("dob", dob);
    formData.append("frontImage", frontImage);
    formData.append("backImage", backImage);

    sotreData(formData).then((response) => {
      console.log(response);
    });

    setName("");
    setEmail("");
    setAddress("");
    setDob(new Date().toISOString(0, 10));
    setPassword("");
    setCitizenshipId("");
    setFrontImage(null);
    setBackImage(null);
  };

  return (
    <>
      <form onSubmit={register}>
        <label for="full-name">Full Name:</label>
        <input
          type="text"
          id="full-name"
          name="full-name"
          placeholder="Enter your full name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <label for="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter your address (province, District)"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          required
        />
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          onChange={multipleVoterHandler}
          value={email}
          required
        />

        <label for="citizenshipid">citizenship Id:</label>
        <input
          type="number"
          id="citizenshipid"
          name="citizenshipid"
          placeholder="Enter your Citizenship Id"
          onChange={(e) => setCitizenshipId(e.target.value)}
          value={citizenshipId}
          required
        />
        <div class="image">
          <label htmlFor="front-image">Front Image:</label>
          <input
            type="file"
            id="front-image"
            encType="multipart/form-data"
            accept=".jpg,.jpeg,.png"
            onChange={handleFrontImageChange}
          />
          {frontImage && (
            <img
              src={URL.createObjectURL(frontImage)}
              alt="frontimage"
              width="300"
            />
          )}

          <label htmlFor="back-image">Back Image:</label>
          <input
            type="file"
            id="back-image"
            encType="multipart/form-data"
            accept=".jpg,.jpeg,.png"
            onChange={handleBackImageChange}
          />
          {backImage && (
            <img
              src={URL.createObjectURL(backImage)}
              alt="backimage"
              width="300"
            />
          )}
        </div>

        <label for="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          placeholder="Enter your date of birth"
          onChangeCapture={dobRestrictionHandler}
          value={dob}
          required
        />

        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button disabled={!buttonState} type="submit">
          Register
        </button>
      </form>
      <div class="alert">{alert}</div>
    </>
  );
};

export default Register;
