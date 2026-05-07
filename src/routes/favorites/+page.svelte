<script>
	import { enhance } from '$app/forms';

	let { data } = $props();

	let search = $state('');
	let removedFavoriteIds = $state([]);
	let openMenuId = $state(null);

	let materials = $derived(data.materials ?? []);

	let filteredMaterials = $derived(
		materials.filter((material) => material.title.toLowerCase().includes(search.toLowerCase()))
	);

	function toggleFavoriteLocally(id) {
		if (removedFavoriteIds.includes(id)) {
			removedFavoriteIds = removedFavoriteIds.filter((removedId) => removedId !== id);
		} else {
			removedFavoriteIds = [...removedFavoriteIds, id];
		}
	}

	function isRemoved(id) {
		return removedFavoriteIds.includes(id);
	}

	function toggleMenu(id) {
		openMenuId = openMenuId === id ? null : id;
	}
</script>

<section class="favorites-page">
	<div class="topbar">
		<div>
			<h1>Favoriten</h1>
			<p>Deine favorisierten Materialien auf einen Blick.</p>

			<a href="/" class="back-link">
				<img src="/images/back.png" alt="" class="back-icon" />
				<span>Zurück zur Übersicht</span>
			</a>
		</div>

		<a href="/add" class="add-button"> + Material hinzufügen </a>
	</div>

	<div class="search-box">
		<img src="/images/search.png" alt="" class="search-icon" />
		<input bind:value={search} placeholder="Suche nach Materialien..." />
	</div>

	<div class="table">
		<div class="table-header">
			<span>Titel</span>
			<span>Fach</span>
			<span>Typ</span>
			<span>Hinzugefügt am</span>
			<span></span>
		</div>

		{#each filteredMaterials as material}
			<div class="table-row">
				<div class="title-cell">
					<a class="material-link" href={`/materials/${material._id}`}>
						<img src="/images/file.png" alt="" class="file-icon" />
						<span>{material.title}</span>
					</a>

					<form
						method="POST"
						action="?/toggleFavorite"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'success') {
									toggleFavoriteLocally(material._id);
								}
							};
						}}
					>
						<input type="hidden" name="id" value={material._id} />
						<input
							type="hidden"
							name="favorite"
							value={isRemoved(material._id) ? 'true' : 'false'}
						/>

						<button class="favorite-button" type="submit">
							<img
								src={isRemoved(material._id)
									? '/images/favorites.png'
									: '/images/favorites-filled.png'}
								alt=""
								class="favorite-icon"
							/>
						</button>
					</form>
				</div>

				<span>{material.subject}</span>
				<span>{material.type}</span>

				<span>
					{new Date(material.createdAt || material.date).toLocaleDateString('de-CH', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric'
					})}
				</span>

				<div
					class="menu-wrapper"
					role="menu"
					tabindex="-1"
					onmouseleave={() => {
						openMenuId = null;
					}}
				>
					<button
						class="menu-button"
						type="button"
						aria-label="Material-Aktionen öffnen"
						onclick={() => toggleMenu(material._id)}
					>
						<img src="/images/menu.png" alt="" class="menu-icon" />
					</button>

					{#if openMenuId === material._id}
						<div class="menu-dropdown">
							<a href={`/materials/${material._id}`}>Öffnen</a>
							<a href={`/materials/${material._id}/edit`}>Bearbeiten</a>

							<form method="POST" action={`/materials/${material._id}?/delete`}>
								<button type="submit" class="delete-action">Löschen</button>
							</form>
						</div>
					{/if}
				</div>
			</div>
		{/each}

		{#if filteredMaterials.length === 0}
			<div class="empty-state">Keine Favoriten gefunden.</div>
		{/if}
	</div>
</section>

<style>
	.favorites-page {
		width: 100%;
	}

	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 56px;
	}

	h1 {
		margin: 0;
		font-size: 28px;
	}

	p {
		margin-top: 8px;
		font-size: 17px;
		color: #444;
	}

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

	.add-button {
		background: #6c5dd3;
		color: white;
		text-decoration: none;
		padding: 14px 28px;
		border-radius: 8px;
		font-size: 16px;
	}

	.search-box {
		display: flex;
		align-items: center;
		gap: 14px;
		height: 52px;
		padding: 0 16px;
		border: 1px solid #e2e2ea;
		border-radius: 8px;
		margin-bottom: 48px;
	}

	.search-box input {
		width: 100%;
		border: none;
		outline: none;
		font-size: 16px;
		background: transparent;
	}

	.search-icon {
		width: 22px;
		height: 22px;
		object-fit: contain;
		opacity: 0.7;
	}

	.table {
		width: 100%;
	}

	.table-header,
	.table-row {
		display: grid;
		grid-template-columns: 2fr 1.2fr 1fr 1.2fr 40px;
		align-items: center;
	}

	.table-header {
		background: #f1f1f1;
		color: #666;
		padding: 18px 28px;
		border-radius: 8px 8px 0 0;
		font-size: 16px;
	}

	.table-row {
		padding: 16px 10px;
		border: 1px solid #c9c9d1;
		border-top: none;
		font-size: 16px;
		color: #111;
	}

	.table-row:hover {
		background: #f8f6ff;
	}

	.title-cell,
	.material-link,
	.favorite-button,
	.menu-wrapper,
	.menu-button {
		display: flex;
		align-items: center;
	}

	.title-cell,
	.material-link {
		gap: 10px;
	}

	.material-link {
		color: #111;
		text-decoration: none;
	}

	.material-link:hover {
		text-decoration: underline;
	}

	.file-icon {
		width: 22px;
		height: 22px;
		object-fit: contain;
	}

	.favorite-button {
		border: none;
		background: transparent;
		padding: 0;
		cursor: pointer;
	}

	.favorite-button:hover {
		opacity: 0.8;
	}

	.favorite-icon {
		width: 20px;
		height: 20px;
		object-fit: contain;
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
		z-index: 10;
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

	.empty-state {
		padding: 32px;
		border: 1px solid #ddd;
		border-top: none;
		color: #777;
	}
</style>
