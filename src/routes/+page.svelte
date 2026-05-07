<script>
	let { data } = $props();

	let search = $state('');
	let selectedSubject = $state('Alle Fächer');
	let openMenuId = $state(null);

	let materials = $derived(data.materials ?? []);

	let subjects = $derived([
		'Alle Fächer',
		...new Set(
			materials
				.map((material) => material.subject)
				.filter(Boolean)
				.sort()
		)
	]);

	let filteredMaterials = $derived(
		materials.filter((material) => {
			const matchesSearch = material.title.toLowerCase().includes(search.toLowerCase());
			const matchesSubject =
				selectedSubject === 'Alle Fächer' || material.subject === selectedSubject;

			return matchesSearch && matchesSubject;
		})
	);

	function toggleMenu(id) {
		openMenuId = openMenuId === id ? null : id;
	}

	function closeMenu() {
		openMenuId = null;
	}

	function formatDate(value) {
		if (!value) return 'Kein Datum';

		if (typeof value === 'string' && value.includes('.')) {
			const parts = value.split('.');

			if (parts.length === 3) {
				const day = parts[0].padStart(2, '0');
				const month = parts[1].padStart(2, '0');
				const year = parts[2];

				return `${day}.${month}.${year}`;
			}
		}

		const date = new Date(value);

		if (Number.isNaN(date.getTime())) {
			return value;
		}

		return date.toLocaleDateString('de-CH', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}
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
			<img src="/images/search.png" alt="" class="search-icon" />
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
			<div class="table-row">
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

				<span>{material.subject}</span>
				<span>{material.type}</span>
				<span>{formatDate(material.date || material.createdAt)}</span>

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

							<a href={`/materials/${material._id}/edit`}> Bearbeiten </a>

							<form method="POST" action={`/materials/${material._id}?/delete`}>
								<button type="submit" class="delete-action">Löschen</button>
							</form>
						</div>
					{/if}
				</div>
			</div>
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
		height: 52px;
		border: 1px solid #e2e2ea;
		border-radius: 8px;
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

	.search-icon,
	.file-icon {
		width: 22px;
		height: 22px;
		object-fit: contain;
	}

	.search-icon {
		opacity: 0.7;
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
