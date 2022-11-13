import {useState} from "react";

const CreateItem = (props) => {

	const [newitem, setNewitemName] = useState({name:"", rank:""}); 

	const onTypeNameHandler = (e) => {
        setNewitemName({...newitem, name:e.target.value})
    }
	const onTypePosHandler = (e) => {
        setNewitemName({...newitem, rank:e.target.value})
    }
	const onSubmitHandler = () => {
		props.addItem(newitem);
		setNewitemName({name:"", rank:""});
	}
	return (
		<div className="create-item-form">
			<input 
				type="text" 
				value={newitem.name} 
				className="new-item-name" 
				placeholder="new item name" 
				onChange={(e)=>onTypeNameHandler(e)}
			></input>
			<input 
				type="number" 
				className="new-item-rating" 
				placeholder="& rank"
				value={newitem.rank}
				onChange={(e)=>onTypePosHandler(e)}
			></input>
			<button 
				type="submit" 
				className="new-item-add" 
				onClick={(e)=>onSubmitHandler(e)} 
				disabled={!(newitem?.name)}
			>add item</button>
		</div>
		)
}

export default CreateItem;