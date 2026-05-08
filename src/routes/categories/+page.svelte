<script>
	import MaterialMenu from '$lib/components/MaterialMenu.svelte';
	import FavoriteIcon from '$lib/components/FavoriteIcon.svelte';
	import BackLink from '$lib/components/BackLink.svelte';
	import { formatDate } from '$lib/utils/date';

	let { data } = $props();

	let materials = $derived(data.materials ?? []);

	let categories = $derived(
		Object.values(
			materials.reduce((groups, material) => {
				const subject = material.subject || 'Ohne Fach';

				if (!groups[subject]) {
					groups[subject] = {
						name: subject,
						materials: []
					};
				}

				groups[subject].materials.push(material);

				return groups;
			}, {})
		)
	);
</script>

<section class="categories-page">
	<div class="page-topbar">
		<div>
			<h1 class="page-title">Kategorien</h1>
			<p class="page-subtitle">Deine Lernmaterialien nach Fach geordnet.</p>

			<BackLink />
		</div>

		<a href="/add" class="primary-button">+ Material hinzufügen</a>
	</div>

	<div class="category-list">
		{#each categories as category}
			<section class="category-card">
				<div class="category-header">
					<h2>{category.name}</h2>
					<span>{category.materials.length} Materialien</span>
				</div>

				<div class="material-list">
					{#each category.materials as material}
						<div class="data-table-row category-table-grid">
							<div class="material-title-cell">
								<a class="material-link" href={`/materials/${material._id}`}>
									<img src="/images/file.png" alt="" class="file-icon" />
									<span>{material.title}</span>
								</a>

								{#if material.favorite}
									<a href="/favorites" class="favorite-link" aria-label="Favoriten öffnen">
										<FavoriteIcon filled={true} />
									</a>
								{/if}
							</div>

							<span>{material.type}</span>
							<span>{formatDate(material.date || material.createdAt)}</span>

							<MaterialMenu materialId={material._id} />
						</div>
					{/each}
				</div>
			</section>
		{/each}

		{#if categories.length === 0}
			<div class="empty-state category-empty-state">Keine Kategorien gefunden.</div>
		{/if}
	</div>
</section>

<style>
	.categories-page {
		width: 100%;
	}

	.category-list {
		display: flex;
		flex-direction: column;
		gap: 28px;
		overflow: visible;
	}

	.category-card {
		border: 1px solid #e2e2ea;
		border-radius: 12px;
		overflow: visible;
	}

	.category-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #f1f1f1;
		padding: 18px 28px;
	}

	.category-header h2 {
		margin: 0;
		font-size: 20px;
	}

	.category-header span {
		color: #666;
		font-size: 15px;
	}

	.material-list {
		width: 100%;
		overflow: visible;
	}

	.category-table-grid {
		grid-template-columns: 2fr 1fr 1.2fr 40px;
		border-left: none;
		border-right: none;
	}

	.category-table-grid:first-child {
		border-top: 1px solid #e2e2ea;
	}

	.file-icon {
		width: 22px;
		height: 22px;
		object-fit: contain;
	}

	.favorite-link {
		display: flex;
		align-items: center;
	}

	.favorite-link:hover {
		opacity: 0.8;
	}

	.category-empty-state {
		border-radius: 8px;
		border-top: 1px solid #ddd;
	}
</style>
