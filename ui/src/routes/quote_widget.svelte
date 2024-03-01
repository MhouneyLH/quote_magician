<script lang="ts">
	import type { Quote } from './quote';

	export let quote: Quote;
</script>

<div>
	<p>"{quote.text}" - {quote.author} ({quote.id})</p>
	<p>Likes: {quote.likeCount}</p>
</div>

<style>
</style>
