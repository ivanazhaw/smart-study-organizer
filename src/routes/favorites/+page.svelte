<script>
	import { enhance } from '$app/forms';
	import MaterialMenu from '$lib/components/MaterialMenu.svelte';
	import FavoriteIcon from '$lib/components/FavoriteIcon.svelte';
	import BackLink from '$lib/components/BackLink.svelte';
	import { formatDate } from '$lib/utils/date';

	let { data } = $props();

	let search = $state('');
	let removedFavoriteIds = $state([]);

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
</script>

<section class="favorites-page">
	<div class="page-topbar">
		<div>
			<h1 class="page-title">Favoriten</h1>
			<p class="page-subtitle">Deine favorisierten Materialien auf einen Blick.</p>

			<BackLink />
		</div>

		<a href="/add" class="primary-button">+ Material hinzufügen</a>
	</div>

	<div class="search-box">
		<img src="/images/search.png" alt="" class="search-icon" />
		<input bind:value={search} placeholder="Suche nach Materialien..." />
	</div>

	<div class="data-table">
		<div class="data-table-header favorites-table-grid">
			<span>Titel</span>
			<span>Fach</span>
			<span>Typ</span>
			<span>Hinzugefügt am</span>
			<span></span>
		</div>

		{#each filteredMaterials as material}
			<div class="data-table-row favorites-table-grid">
				<div class="material-title-cell">
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
							<FavoriteIcon filled={!isRemoved(material._id)} />
						</button>
					</form>
				</div>

				<span>{material.subject}</span>
				<span>{material.type}</span>
				<span>{formatDate(material.date || material.createdAt)}</span>

				<MaterialMenu materialId={material._id} />
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

	.search-icon,
	.file-icon {
		width: 22px;
		height: 22px;
		object-fit: contain;
	}

	.search-icon {
		opacity: 0.7;
	}

	.favorites-table-grid {
		grid-template-columns: 2fr 1.2fr 1fr 1.2fr 40px;
	}

	.favorite-button {
		display: flex;
		align-items: center;
		border: none;
		background: transparent;
		padding: 0;
		cursor: pointer;
	}

	.favorite-button:hover {
		opacity: 0.8;
	}
</style>
