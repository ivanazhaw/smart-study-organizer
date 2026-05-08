<script>
	let { href = '/', text = 'Zurück zur Übersicht' } = $props();
</script>

<a {href} class="back-link">
	<img src="/images/back.png" alt="" class="back-icon" />
	<span>{text}</span>
</a>

<style>
	.back-link {
		margin-top: 18px;
		display: inline-flex;
		align-items: center;
		gap: 10px;
		color: #111;
		text-decoration: none;
		font-size: 16px;
	}

	.back-link:hover {
		text-decoration: underline;
	}

	.back-icon {
		width: 18px;
		height: 18px;
		object-fit: contain;
	}
</style>
