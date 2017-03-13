<template id="index">
	<h1>Index</h1>
</template>
<script>
	module.exports = {
		data:function(){
			return {
				completeLife:false
				}
		},
		created:function(){
			console.log('created...');
		},
		mounted:function(){
			console.log('mounted...');
		}
	}
</script>
