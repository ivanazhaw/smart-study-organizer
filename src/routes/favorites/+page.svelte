<script>
	let search = $state('');

	const materials = [
		{
			id: 2,
			title: 'BWL Notizen',
			subject: 'BWL',
			type: 'Notizen',
			date: '08.04.2025',
			favorite: true
		},
		{
			id: 5,
			title: 'Statistik SW03',
			subject: 'Statistik',
			type: 'Notizen',
			date: '21.02.2025',
			favorite: true
		}
	];

	let filteredMaterials = $derived(
		materials.filter((material) => material.title.toLowerCase().includes(search.toLowerCase()))
	);
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

		<a href="/add" class="add-button">+ Material hinzufügen</a>
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
			<a class="table-row" href={`/materials/${material._id}`}>
				<div class="title-cell">
					<img src="/images/file.png" alt="" class="file-icon" />

					<span>{material.title}</span>

					<img src="/images/favorites.png" alt="" class="favorite-icon" />
				</div>

				<span>{material.subject}</span>
				<span>{material.type}</span>
				<span>{material.date}</span>

				<img src="/images/menu.png" alt="" class="menu-icon" />
			</a>
		{/each}
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
		text-decoration: none;
		color: #111;
		padding: 16px 10px;
		border: 1px solid #c9c9d1;
		border-top: none;
		font-size: 16px;
	}

	.table-row:hover {
		background: #f8f6ff;
	}

	.title-cell {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.file-icon {
		width: 22px;
		height: 22px;
		object-fit: contain;
	}

	.favorite-icon {
		width: 20px;
		height: 20px;
		object-fit: contain;
		margin-left: 6px;
	}

	.menu-icon {
		width: 18px;
		height: 18px;
		object-fit: contain;
		margin-left: auto;
	}
</style>