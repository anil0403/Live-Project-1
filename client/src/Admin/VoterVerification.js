import { useEffect, useState } from "react";
import { getRawData } from "../Api/ApiHandler";
import RawVoter from "../components/RawVoter";

const VoterVerification = ({ token = "" }) => {
  const [voterIdData, setVoterIdData] = useState([]);
  const [shouldRefreshData, setShouldRefreshData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRawData(token);
      setVoterIdData(response.data || []);
    };
    fetchData();
  }, [shouldRefreshData, token]);

  const handleRefreshData = () => {
    setShouldRefreshData(!shouldRefreshData);
  };

  return (
    <div>
      <h2 className="heading">Pending Approvals</h2>
      {voterIdData.length > 0 &&
        voterIdData.map((data) => {
          const img1 = process.env.REACT_APP_API_URL + data.imageUrl1;
          const img2 = process.env.REACT_APP_API_URL + data.imageUrl2;
          if (data.flag === 0) {
            return (
              <RawVoter
                key={data.v_id}
                data={data}
                img1={img1}
                img2={img2}
                refreshHandler={handleRefreshData}
                token={token}
              />
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};

export default VoterVerification;
