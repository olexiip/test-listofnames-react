
import { useState } from "react";
import { useEffect } from "react";

import useApi from "../../hooks/useApi";
import ListItem from "../ListItem/ListItem";
import CreateItem from "../CreateItem/CteateItem";
import Pages from "../Pagination/Pagination";
import EditItem from "../EditItem/EditItem.js"

const List = () => {

	const api = useApi();

	const pagLimit = 10;

	const [updatedList, updateListState] = useState({names:[], page:1, total:undefined, limit: pagLimit});
	const [currentModal, updateModal] = useState({});
	const [dnd1, setDnd1] = useState({});

	const getData = async (page=1) => {
		const update = async (getTodoResp) => {
		  updateListState(getTodoResp);
		}
		await api.getData([{ limit: pagLimit, page: page}]).then(update);
	  }

	useEffect(()=>{
		getData(1);
	  }, []);

	const onDrop = async (e, id) => {
		e.target.style="";
		await api.swapItems([dnd1, id]);
		getData(updatedList.page);
	}
	const onDragStart = (e, id) => {
		e.target.style.background = "#dfffd3"; //green
		setDnd1(id)
	}
	const onDragLeave = (e, id) => {
			e.target.style="";
	}
	const onDragEnd = (e) => {
		e.target.style="";
	}
	const onDragOver = (e, id) => {
		if (id !== dnd1) {
			e.preventDefault();
			e.target.style.background = "grey"
		}
	}

	const addItemHandler = async (newItem) => {
		await api.addItem([newItem.name, newItem.rank]);
		getData(updatedList.page);
	}

	const onChangePage = (page) => {
		if (page === updatedList.page) {
		  return;
		};
		getData(page);
	  };
	
	  const getPagesCount = () => {
		return Math.ceil(updatedList.total / updatedList.limit);
	  };

	const  deleteHandler = async (id) => {
		await api.deleteItem([id]);
		getData(updatedList.page);
	}

	const handleSave = async (editableID, editedTitle, EditedRank) => {
		await api.editItem([editableID,editedTitle,EditedRank]);
		getData(1);
		//updateModal({}); 
	}
	
	const editHandler = (id, text, rank) => {
		updateModal({
			show:true,
			id:id,
			text:text,
			rank: rank
		})
	}


	const showEditModal = () => {
        return (
            <EditItem 
							show={currentModal.show} 
							id={currentModal.id} 
							text={currentModal.text}
							rank={currentModal.rank}
							handleClose = {handleClose} 
							handleSave={handleSave}
        		></EditItem>  
        	)
    }

	const handleClose = () => {
		updateModal({});
	}

	return (
		<div className="list">
			<CreateItem addItem={addItemHandler}></CreateItem>
			<div className="list-header">
				<div className="item-rating-h">Rank</div>
				<div className="item-name-h">Name</div>
			</div>

			{
							updatedList.names.map( (item)=>(
								<ListItem 
									key={item.id} 
									onDragStart={onDragStart}
									onDragLeave={onDragLeave}
									onDragEnd={onDragEnd}
									onDragOver={onDragOver}
									onDrop={onDrop}
									deleteHandler={deleteHandler}
									editHandler={editHandler}
									{...item} 
									
								></ListItem>
								))
			}

			<Pages className="pages"
							onChange={onChangePage}
							active={updatedList.page}
							pages={getPagesCount()}
							maxButtons={3}
					/>  

			{currentModal?.show?showEditModal():""}

		</div>

	)
}
export default List;