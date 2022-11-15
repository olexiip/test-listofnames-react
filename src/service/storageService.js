
import { v4 as uuidv4 } from 'uuid'; // generate uniq ID

const StorageService = () => {
	const example = {
		names: [
			{	
				id: 0,
				name:"example 1",
				rank:0
			},
			{
				id: 1,
				name:"example 2",
				rank:1
			},
		],
	}

	const getAllData = async () => {
			const data = await JSON.parse(localStorage.getItem("nameList"));
			if(data?.names) {
				return data;
			}
			localStorage.setItem("nameList", JSON.stringify(example));
			return example;
	}

	const sortData = (data) => {
		data.names.sort((a,b)=>a.rank - b.rank);
		return data;
	}

	const saveData = async (data) => {
		writeRanks(data);
		try {
			await localStorage.setItem("nameList", JSON.stringify(data));
		} catch (e) {
			console.log(e)
			return {"err":"sww"};
		}
		return {"res":"ok"};
	}

	const writeRanks = (data) => {
		data.names.forEach((element, index) => {
			element.rank = index;
		});
		return data;
	}

	const findItem = (data, id) => {
		let target;
		data.names.find(function(item, index){
			if (item.id === id) {
				target=index;
				return true;
			}
			return false;
		})
		return target;
	}

	

	const getData = async (pag) => {
		const page = pag?.page;
		const limit = pag?.limit;
		const validParams = (typeof(page)===typeof(limit) && typeof(limit) ==="number");
		
		if (validParams) {
			let data = "";
			const pagSlice = (data) => {
				const max = page*limit;
				const prev = ((max-limit)>0)?max-limit:0;
				if (data) {
					const res = data.names.slice(prev, max);
					const finalRes = {names:res, ...pag, total:data.names.length};
					return finalRes;
				}
			}
			data = getAllData().then(pagSlice);
			if (data) {
				return data;
			}
		}
		
		return {"res":"err"};
	}

	const AddItem = async (item, rank = -1) => {
		const insertItem = async (data)  => {
			if ((rank <0) || ( +rank > data.names.length)) {
				rank = data.names.length;
			} 
			const newID = uuidv4();
			data.names.splice(rank,0,{id:newID, name:item,  rank});
			await saveData(data);
		}

		try {
			getAllData().then(insertItem);
		} catch (e) {
			console.log(e);
			return  {"err":"sww"};
		}
		
		return {"res":"ok"};
	}  

	const swapItems = async (id1, id2) => {

		const swap = (data) => {
			const item1 = findItem(data, id1);
			const item2 = findItem(data, id2);
			data.names[item1].rank=item2;
			data.names[item2].rank=item1;
			sortData(data);
			saveData(data);
		}
		try {
			getAllData().then(swap);
		} catch (e) {
			console.log(e);
			return {"err":"sww"};
		}	 
		return {"res":"ok"};
	}

	const editItem = async (id, text, rank) => {

		let letsChangeName = false;
		let letschangeRank = false;
		letsChangeName = text!=="";
		letschangeRank = ( rank>=0 );
		if ( letsChangeName || letschangeRank) {
			const edit = (data) => {
				const itemIndex = findItem(data, id);
				if (itemIndex>-1) {
					if (letsChangeName) {
						data.names[itemIndex].name = text;
					}
					if (letschangeRank) {
						const oldRank = data.names[itemIndex].rank;
						data.names[itemIndex].rank=+rank + Math.sign(rank-oldRank)/10;
						sortData(data);
					}
					saveData(data);
				} else {
					console.log("item not finded")
					return {"err":"sww"};
				}
				
				return 1;
			}
			try {
				getAllData().then(edit);
				return  {"res":"ok"}
			} catch (e) { 
				console.log(e);
				return  {"err":"sww"};
			}
		} else {
			console.log("empty response")
			return  {"err":"sww"};
		}
	}

	const deleteItem = async (id) => {
		console.log("deleteItem")
		console.log(id)
		const delItem = (data) => {
			const target =  findItem(data, id);
			if(target>-1){
				data.names.splice(target,1);
				saveData(data);
			}
		}
		try { 
			getAllData().then(delItem);
		} catch (e) {
			console.log(e);
			return {"err":"sww"};
		}
		return {"res":"ok"};
	}

	return {getData, swapItems, deleteItem, AddItem, editItem};
}

export default StorageService;
