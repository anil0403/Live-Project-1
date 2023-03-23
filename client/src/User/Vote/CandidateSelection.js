const CandidateSelection = (props) => {
    const data = props.data;
    const voteData = [
      data.name,
      data.candidate_address,
      data.category_name,
      data.party_name,
    ];
  //   console.log(voteData);
  return <option value={voteData}>{props.data.name}</option>;
};

export default CandidateSelection;
