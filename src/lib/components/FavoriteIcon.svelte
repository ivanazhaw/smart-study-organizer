<script>
	let { filled = false, alt = 'Favorit' } = $props();
</script>

<img
	src={filled ? '/images/favorites-filled.png' : '/images/favorites.png'}
	alt={alt}
	class="favorite-icon"
/>

<style>
	.favorite-icon {
		width: 20px;
		height: 20px;
		object-fit: contain;
	}
</style>