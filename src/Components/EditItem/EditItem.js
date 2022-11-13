import { useState } from "react"
import {Modal} from "react-bootstrap";


const EditItem = (props) => {
	let changesRank = false;
	let changesName = false;
	const [newItemTitle, setNewListTitle] = useState(props.text); 
	const [newItemRank, setnewItemRank] = useState(props.rank); 

	const onTypeNameHandler = (e) => {
		setNewListTitle(e.target.value);
	}
	const onTypeRankHandler = (e) => {
		setnewItemRank(e.target.value);
	}
	const onSubmitkHandler = (e) => {
		e.preventDefault();
		changesName = !(newItemTitle === props.text);
		changesRank = !(newItemRank === props.rank);
		const newName = changesName?newItemTitle:-1;
		const newRank = changesRank?newItemRank:-1;
		if (changesName||changesRank) {
			props.handleSave(props.id, newName, newRank);
		}
		setNewListTitle("");
		props.handleClose();
	}

	return (
	<div>
		<Modal
				show={props.show}
				onHide={props.handleClose}
				backdrop="static"
				keyboard={false}
			>
				<form onSubmit={onSubmitkHandler}>   
					<Modal.Header closeButton>
						<Modal.Title>Edit item</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="editform-wrapper">
							<div className="editform-titles">New name:</div>
							<input 
								type="text" 
								value={newItemTitle} 
								className="edit-name" 
								placeholder="new Name"
								onChange={onTypeNameHandler}
							/>                  
							<div className="editform-titles">New rank:</div>
							<input 
								type="number" 
								value={newItemRank} 
								className="edit-rank" 
								placeholder="new rank"
								onChange={onTypeRankHandler}
							/>   
						</div>                     
					</Modal.Body>
					<Modal.Footer>
						<button 
							onClick={()=>(props.handleClose())}
						>Close</button>
						<button 
							disabled={(changesName||changesRank)} 
						>Save</button>
					</Modal.Footer>
				</form>  
		</Modal>
	</div>
	)}

export default EditItem