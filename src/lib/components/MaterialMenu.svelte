<script>
	let { materialId } = $props();

	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}
</script>

<div class="menu-wrapper" role="menu" tabindex="-1" onmouseleave={closeMenu}>
	<button
		class="menu-button"
		type="button"
		aria-label="Material-Aktionen öffnen"
		onclick={toggleMenu}
	>
		<img src="/images/menu.png" alt="" class="menu-icon" />
	</button>

	{#if isOpen}
		<div class="menu-dropdown">
			<a href={`/materials/${materialId}`}>Öffnen</a>

			<a href={`/materials/${materialId}/edit`}> Bearbeiten </a>

			<form method="POST" action={`/materials/${materialId}?/delete`}>
				<button type="submit" class="delete-action"> Löschen </button>
			</form>
		</div>
	{/if}
</div>

<style>
	.menu-wrapper,
	.menu-button {
		display: flex;
		align-items: center;
	}

	.menu-wrapper {
		position: relative;
		justify-content: flex-end;
	}

	.menu-button {
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 4px;
	}

	.menu-icon {
		width: 18px;
		height: 18px;
		object-fit: contain;
	}

	.menu-dropdown {
		position: absolute;
		top: 28px;
		right: 0;
		min-width: 170px;
		background: white;
		border: 1px solid #e2e2ea;
		border-radius: 8px;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		z-index: 999;
	}

	.menu-dropdown a,
	.menu-dropdown button {
		width: 100%;
		padding: 12px 16px;
		border: none;
		background: white;
		color: #111;
		text-align: left;
		text-decoration: none;
		font-size: 15px;
		cursor: pointer;
		box-sizing: border-box;
	}

	.menu-dropdown a:hover,
	.menu-dropdown button:hover {
		background: #f8f6ff;
	}

	.menu-dropdown form {
		margin: 0;
	}

	.delete-action {
		color: #e53935;
	}
</style>
