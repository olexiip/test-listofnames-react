
import  StorageService  from "../service/storageService";
export const useApi = () => {
	const Service = StorageService();

	const  getData = async (page=1) => {
		let res; 
		try {
			res = await Service.getData(page);
		} catch (e) {
			console.log(e);
		}

		if (res?.names) {
			return res;
		}
		return {names:[{rank:0,name:"err", id:0}]}; 
	}

	const deleteItem = async (id) => {
		try {
			await Service.deleteItem(id);
		} catch (e) {
			console.log(e);
		}
		return {"res":"ok"};
	}

	const addItem = async (item, rank = -1) => {
		try {
			await Service.AddItem(item, rank);
		} catch (e) {
			console.log(e);
		}
		return {"res":"ok"};
	}  
	const swapItems = async (id1, id2) => {
		await Service.swapItems(id1, id2);
		return  {"res":"ok"};
	}
	const editItem = async (id, text=-1, rank=-1) => {
		const res = await Service.editItem(id, text, rank);
		// console.log(res);
		return {"res":"ok"};
	}


	return {
		getData,
		deleteItem,
		addItem,
		swapItems,
		editItem,
	}
}

export default useApi;