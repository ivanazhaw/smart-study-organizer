<script>
	import MaterialMenu from '$lib/components/MaterialMenu.svelte';
	import { formatDate } from '$lib/utils/date';
	import FavoriteIcon from '$lib/components/FavoriteIcon.svelte';
	import BackLink from '$lib/components/BackLink.svelte';

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
	<div class="topbar">
		<div>
			<h1>Kategorien</h1>
			<p>Deine Lernmaterialien nach Fach geordnet.</p>
			<BackLink />
		</div>

		<a href="/add" class="add-button">+ Material hinzufügen</a>
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
						<div class="material-row">
							<div class="title-cell">
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

							<span>
								{formatDate(material.date || material.createdAt)}
							</span>

							<MaterialMenu materialId={material._id} />
						</div>
					{/each}
				</div>
			</section>
		{/each}

		{#if categories.length === 0}
			<div class="empty-state">Keine Kategorien gefunden.</div>
		{/if}
	</div>
</section>

<style>
	.categories-page {
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
		margin: 8px 0 0;
		font-size: 17px;
		color: #333;
	}

	.add-button {
		background: #6c5dd3;
		color: white;
		text-decoration: none;
		padding: 14px 28px;
		border-radius: 8px;
		font-size: 16px;
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

	.material-list {
		width: 100%;
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

	.material-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1.2fr 40px;
		align-items: center;
		padding: 16px 18px;
		border-top: 1px solid #e2e2ea;
		font-size: 16px;
		color: #111;
	}

	.material-row:hover {
		background: #f8f6ff;
	}

	.title-cell,
	.material-link,
	.favorite-link {
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

	.favorite-link:hover {
		opacity: 0.8;
	}

	.empty-state {
		padding: 32px;
		border: 1px solid #ddd;
		border-radius: 8px;
		color: #777;
	}
</style>
