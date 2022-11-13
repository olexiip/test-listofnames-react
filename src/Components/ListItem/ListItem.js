const ListItem = (props) => {
	//console.log(props);
	return (
		<div 
		className="list-item" 
		draggable={true}
		onDragStart={(e)=>props.onDragStart(e, props.id)}
		onDragLeave={(e)=>props.onDragLeave(e, props.id)}
		onDragEnd={(e)=>props.onDragEnd(e, props.id)}
		onDragOver={(e)=>props.onDragOver(e, props.id)}
		onDrop={(e)=>props.onDrop(e, props.id)}
		
		>
			<div className="item-rank">{props.rank}</div>
			<div className="item-name" draggable={false} >{props.name}</div>
			<div className="terminator"></div>
			<div className="item-c-del" onClick={()=>props.deleteHandler(props.id)}>Del</div>
			<div className="item-c-edit" onClick={()=>props.editHandler(props.id, props.name, props.rank)}>Edit</div>
		</div>
	)
}

export default ListItem;