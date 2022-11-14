
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

	const getData = async (pag) => {
		const page = pag?.page;
		const limit = pag?.limit;
		const condition0 = (typeof(page)===typeof(limit) && typeof(limit) ==="number");
		
		if (condition0) {
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
			data = await getAllData().then(pagSlice);
			if (data) {
				return data;
			}
		}
		
		return {"res":"err"};
	}

	const getAllData = async () => {
			const data= await JSON.parse(localStorage.getItem("nameList"));
			if(data?.names) {
				return data;
			}
			localStorage.setItem("nameList", JSON.stringify(example));
			return example;
	}

	const deleteItem = async (id) => {
		const delItem = (data) => {
			const target =  findItem(data, id);
			if(target>-1){
				data.names.splice(target,1);
				saveData(data);
			}
		}
		try { 
			await getAllData().then(delItem);
		} catch (e) {
			console.log(e);
			return {"err":"sww"};
		}
		return {"res":"ok"};
	}

	const saveData = async (data) => {
		data.names.forEach((element, index) => {
			element.rank = index;
		});
		try {
			await localStorage.setItem("nameList", JSON.stringify(data));
		} catch (e) {
			console.log(e)
			return {"err":"sww"};
		}
		return {"res":"ok"};
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
			await getAllData().then(insertItem);
		} catch (e) {
			console.log(e);
			return  {"err":"sww"};
		}
		
		return {"res":"ok"};
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

	const swapItems = async (id1, id2) => {

		const swap = (data) => {
			const item1 = findItem(data, id1);
			const item2 = findItem(data, id2);
			data.names[item1].rank=item2;
			data.names[item2].rank=item1;
			data.names.sort((a,b)=>a.rank -b.rank);
			saveData(data);
		}
		try {
			await getAllData().then(swap);
		} catch (e) {
			console.log(e);
			return {"err":"sww"};
		}	 
		return {"res":"ok"};
	}

	const editItem = async (id, text, rank) => {
		let letsChangeName = false;
		let letschangeRank = false;
		letsChangeName = typeof(text)==="string";
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
						data.names.sort((a,b)=>a.rank - b.rank);
					}
					saveData(data);
				} else {
					console.log("item not finded")
					return {"err":"sww"};
				}
				
				return 1;
			}
			try {
				await getAllData().then(edit);
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










	return {getData, swapItems, deleteItem, AddItem, editItem};
}

export default StorageService;
