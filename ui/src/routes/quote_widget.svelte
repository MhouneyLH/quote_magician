<script lang="ts">
	import type { Quote } from './quote';
	import heart from '../lib/images/heart.png';

	export let quote: Quote;
</script>

<div class="widget-border">
	<p>"{quote.text}"</p>
	<p>~ {quote.author}</p>
	<div>
		<img src={heart} alt="Like" width="16px" />
		<p>{quote.likeCount}</p>
	</div>
</div>

<style>
	div.widget-border {
		border: 1px solid #000;
		padding: 10px;
		display: block;
	}
</style>
