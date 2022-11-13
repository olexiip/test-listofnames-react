import Pagination from "react-bootstrap/Pagination";

const Pages = (props) => {
	//console.log(props)
	const { onChange, active, pages, maxButtons } = props;
	//console.log("pagination conponent")
	
	
  let items = [];

  const startIndex = active - 1 || 1;
  const endIndex = Math.min(pages, maxButtons + startIndex - 1);

  for (let number = startIndex; number <= endIndex; number++) {
    items.push(
      <Pagination.Item onClick={() => onChange(number)} key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  if(pages<2) {
    return (
	 
      <div> 
      </div>
    );
  }

  return (
	 
    <div> 
		<hr/>
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default Pages;