<script>
	let search = $state('');
	let selectedSubject = $state('Alle Fächer');

	const materials = [
		{
			id: 1,
			title: 'Mathe Zusammenfassung',
			subject: 'Mathematik',
			type: 'PDF',
			date: '12.04.2025',
			favorite: false
		},
		{
			id: 2,
			title: 'BWL Notizen',
			subject: 'BWL',
			type: 'Notizen',
			date: '08.04.2025',
			favorite: true
		},
		{
			id: 3,
			title: 'Statistik Übungen',
			subject: 'Statistik',
			type: 'PDF',
			date: '02.03.2025',
			favorite: false
		},
		{
			id: 4,
			title: 'Englisch Reading',
			subject: 'Englisch',
			type: 'PDF',
			date: '23.02.2025',
			favorite: false
		},
		{
			id: 5,
			title: 'Statistik SW03',
			subject: 'Statistik',
			type: 'Notizen',
			date: '21.02.2025',
			favorite: false
		},
		{
			id: 6,
			title: 'WINS SW02',
			subject: 'WINS',
			type: 'Notizen',
			date: '14.02.2025',
			favorite: false
		}
	];

	const subjects = ['Alle Fächer', 'Mathematik', 'BWL', 'Statistik', 'Englisch', 'WINS'];

	let filteredMaterials = $derived(
		materials.filter((material) => {
			const matchesSearch = material.title.toLowerCase().includes(search.toLowerCase());
			const matchesSubject =
				selectedSubject === 'Alle Fächer' || material.subject === selectedSubject;

			return matchesSearch && matchesSubject;
		})
	);
</script>

<section class="home">
	<div class="topbar">
		<div>
			<h1>Willkommen zurück!</h1>
			<p>Finde schnell dein Lernmaterial.</p>
		</div>

		<a href="/add" class="add-button">+ Material hinzufügen</a>
	</div>

	<div class="filters">
		<div class="search-box">
			<img src="/images/search.png" alt="Search" class="search-icon" />
			<input bind:value={search} placeholder="Suche nach Materialien..." />
		</div>

		<select bind:value={selectedSubject}>
			{#each subjects as subject}
				<option value={subject}>{subject}</option>
			{/each}
		</select>
	</div>

	<h2>Meine Materialien ({filteredMaterials.length})</h2>

	<div class="table">
		<div class="table-header">
			<span>Titel</span>
			<span>Fach</span>
			<span>Typ</span>
			<span>Hinzugefügt am</span>
			<span></span>
		</div>

		{#each filteredMaterials as material}
			<a class="table-row" href={`/materials/${material.id}`}>
				<div class="title-cell">
					<img src="/images/file.png" alt="Datei" class="file-icon" />
					<span>{material.title}</span>
					{#if material.favorite}
						<img src="/images/favorites.png" alt="Favorit" class="favorite-icon" />
					{/if}
				</div>

				<span>{material.subject}</span>
				<span>{material.type}</span>
				<span>{material.date}</span>
				<img src="/images/menu.png" alt="" class="menu-icon" />
			</a>
		{/each}

		{#if filteredMaterials.length === 0}
			<div class="empty-state">Keine passenden Materialien gefunden.</div>
		{/if}
	</div>
</section>

<style>
	.home {
		width: 100%;
	}

	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 64px;
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

	.filters {
		display: grid;
		grid-template-columns: 1fr 220px;
		gap: 16px;
		margin-bottom: 56px;
	}

	.search-box {
		border: 1px solid #e2e2ea;
		border-radius: 8px;
		height: 52px;
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 0 16px;
	}

	input,
	select {
		width: 100%;
		border: none;
		outline: none;
		font-size: 16px;
		background: transparent;
	}

	select {
		border: 1px solid #e2e2ea;
		border-radius: 8px;
		padding: 0 16px;
		color: #555;
		background: white;
	}

	h2 {
		font-size: 18px;
		margin-bottom: 28px;
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

	.search-icon {
		width: 22px;
		height: 22px;
		object-fit: contain;
		opacity: 0.7;
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

	.empty-state {
		padding: 32px;
		border: 1px solid #ddd;
		border-top: none;
		color: #777;
	}
</style>
