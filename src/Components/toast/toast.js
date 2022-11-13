
const toast = (type="msg", msg) => {	
	const imgSrc = type==="msg"?"../Components/imgs/done.png":"..src/Components/imgs/err.png"
	console.log(imgSrc);


	return (
		<div className="toast">
			<div className="toast-img">
				<img src={imgSrc} alt="toast img"/>
			</div>
			<div className="toast-header">

			</div>
			<div className="toast-body">

			</div>
		</div>
	)
}