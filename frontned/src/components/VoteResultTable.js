const VoteResultComponent = (props) => {
  const item = props.item;
  // console.log(item)
  return (
    <tr>
      <td>{item.r_id}</td>
      <td>{item.candidate_name}</td>
      <td>{item.category_name}</td>
      <td>{item.party_name}</td>
      <td>{item.votes}</td>
    </tr>
  );
};

export default VoteResultComponent;
