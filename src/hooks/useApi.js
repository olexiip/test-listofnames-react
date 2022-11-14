
import  StorageService  from "../service/storageService";
export const useApi = () => {
	const Service = StorageService();


	const sendReq = async (service, data) => {
		try {
			return await Service[service](...data);
		} catch (e) {
			console.log("catch")
			console.log(e);
			/// throw err msg
		}
	}
	
	return {
		getData: (data)=>sendReq("getData", data),
		deleteItem: (data)=>sendReq("deleteItem", data),
		addItem: (data)=>sendReq("AddItem", data),
		swapItems: (data)=>sendReq("swapItems", data),
		editItem: (data)=>sendReq("editItem", data),
	}
}

export default useApi;