<script>
	const categories = [
		{
			name: 'Mathematik',
			materials: [
				{
					id: 1,
					title: 'Mathe Zusammenfassung',
					type: 'PDF',
					date: '12.04.2025',
					favorite: false
				}
			]
		},
		{
			name: 'BWL',
			materials: [
				{
					id: 2,
					title: 'BWL Notizen',
					type: 'Notizen',
					date: '08.04.2025',
					favorite: true
				}
			]
		},
		{
			name: 'Statistik',
			materials: [
				{
					id: 3,
					title: 'Statistik Übungen',
					type: 'PDF',
					date: '02.03.2025',
					favorite: false
				},
				{
					id: 5,
					title: 'Statistik SW03',
					type: 'Notizen',
					date: '21.02.2025',
					favorite: false
				}
			]
		}
	];
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
										<img src="/images/favorites.png" alt="" class="favorite-icon" />
									</a>
								{/if}
							</div>

							<span>{material.type}</span>
							<span>{material.date}</span>

							<img src="/images/menu.png" alt="" class="menu-icon" />
						</div>
					{/each}
				</div>
			</section>
		{/each}
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
	}

	.category-card {
		border: 1px solid #e2e2ea;
		border-radius: 12px;
		overflow: hidden;
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

	.title-cell {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.material-link {
		display: inline-flex;
		align-items: center;
		gap: 10px;
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

	.favorite-link {
		display: inline-flex;
		align-items: center;
	}

	.favorite-link:hover {
		opacity: 0.8;
	}

	.favorite-icon {
		width: 20px;
		height: 20px;
		object-fit: contain;
	}

	.menu-icon {
		width: 18px;
		height: 18px;
		object-fit: contain;
		margin-left: auto;
	}
</style>
