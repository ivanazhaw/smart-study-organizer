<script>
	const materials = [
		{
			id: 2,
			title: 'BWL Notizen',
			subject: 'BWL',
			type: 'Notizen',
			lastOpened: 'heute, 10:24 Uhr',
			favorite: true
		},
		{
			id: 4,
			title: 'Englisch Reading',
			subject: 'Englisch',
			type: 'PDF',
			lastOpened: 'gestern, 18:23 Uhr',
			favorite: false
		},
		{
			id: 5,
			title: 'Statistik SW03',
			subject: 'Statistik',
			type: 'Notizen',
			lastOpened: 'vor 2 Tagen',
			favorite: false
		},
		{
			id: 6,
			title: 'WINS SW02',
			subject: 'WINS',
			type: 'Notizen',
			lastOpened: 'vor 5 Tagen',
			favorite: false
		}
	];
</script>

<section class="recent-page">
	<div class="topbar">
		<div>
			<h1>Zuletzt verwendet</h1>
			<p>Materialien, die du zuletzt geöffnet hast.</p>

			<a href="/" class="back-link">
				<img src="/images/back.png" alt="" class="back-icon" />
				<span>Zurück zur Übersicht</span>
			</a>
		</div>

		<a href="/add" class="add-button">+ Material hinzufügen</a>
	</div>

	<div class="table">
		<div class="table-header">
			<span>Titel</span>
			<span>Fach</span>
			<span>Typ</span>
			<span>Zuletzt geöffnet</span>
			<span></span>
		</div>

		{#each materials as material}
			<div class="table-row">
				<div class="title-cell">
					<a class="material-link" href={`/materials/${material._id}`}>
						<img src="/images/file.png" alt="Datei" class="file-icon" />

						<span>{material.title}</span>
					</a>

					{#if material.favorite}
						<a href="/favorites" class="favorite-link" aria-label="Favoriten öffnen">
							<img src="/images/favorites.png" alt="Favorit" class="favorite-icon" />
						</a>
					{/if}
				</div>

				<span>{material.subject}</span>
				<span>{material.type}</span>
				<span>{material.lastOpened}</span>

				<img src="/images/menu.png" alt="" class="menu-icon" />
			</div>
		{/each}
	</div>
</section>

<style>
	.recent-page {
		width: 100%;
	}

	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 96px;
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

	.table {
		width: 100%;
	}

	.table-header,
	.table-row {
		display: grid;
		grid-template-columns: 2fr 1.2fr 1fr 1.4fr 40px;
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
