<template id="index">
	<div class="frame">Hello world!</div>
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
