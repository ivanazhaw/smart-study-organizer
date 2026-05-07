<script>
	let { data } = $props();

	let openMenuId = $state(null);
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

	function toggleMenu(id) {
		openMenuId = openMenuId === id ? null : id;
	}
</script>

<section class="categories-page">
	<div class="topbar">
		<div>
			<h1>Kategorien</h1>
			<p>Deine Lernmaterialien nach Fach geordnet.</p>

			<a href="/" class="back-link">
				<img src="/images/back.png" alt="" class="back-icon" />
				<span>Zurück zur Übersicht</span>
			</a>
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
										<img src="/images/favorites-filled.png" alt="" class="favorite-icon" />
									</a>
								{/if}
							</div>

							<span>{material.type}</span>

							<span>
								{new Date(material.createdAt).toLocaleDateString('de-CH', {
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
	.favorite-link,
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

	.favorite-link:hover {
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

	.empty-state {
		padding: 32px;
		border: 1px solid #ddd;
		border-radius: 8px;
		color: #777;
	}
</style>
