function doWork(){
	for(var i=0; i<10000; i++){
		for(var j=0; j<10000; j++)
			for(var k=0; k<100; k++){
				
			}
		if (i % 100 === 0){
			var percentCompleted = (i / 10000) * 100;
			self.postMessage({
				type : 'progress',
				percentCompleted : percentCompleted
			});
		}
	}
}
self.addEventListener("message", function(evtArg){
	var msg = evtArg.data;
	if (msg === 'start'){
		doWork();
		self.postMessage({ type : "completed"});
	} else {
		console.log("unknown message received - ", msg);
	}
});
//receive the 'start' message and run doWork()
//post the 'completed' message