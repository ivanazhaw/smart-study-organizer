<script>
	let { data } = $props();

	let material = $derived(data.material);
</script>

<section class="detail-page">
	<a href="/" class="back-link">
		<img src="/images/back.png" alt="" class="back-icon" />
		<span>Zurück zur Übersicht</span>
	</a>

	{#if material}
		<div class="topbar">
			<h1>{material.title}</h1>

			<button class="fav-btn">
				<img src="/images/favorites.png" alt="" class="button-icon" />
				Zu Favoriten hinzufügen
			</button>
		</div>

		<div class="card">
			<div class="file-preview">
				<img src="/images/file.png" alt="Datei Icon" />
			</div>

			<div class="material-title">
				<h2>{material.title}</h2>
				<span>{material.subject}</span>
			</div>
		</div>

		<div class="info">
			<div class="row">
				<span>Typ</span>
				<strong>{material.type}</strong>
			</div>

			<div class="row">
				<span>Hinzugefügt am</span>
				<strong>{material.date || 'Kein Datum'}</strong>
			</div>

			<div class="row">
				<span>Dateiname</span>
				<strong>{material.fileName || 'Keine Datei'}</strong>
			</div>

			<div class="row">
				<span>Notiz</span>
				<strong>{material.note || 'Keine Notiz'}</strong>
			</div>
		</div>

		<div class="actions">
			<button class="download">
				<img src="/images/upload.png" alt="" class="button-icon white-icon" />
				Öffnen / Herunterladen
			</button>

			<button class="delete">
				<img src="/images/delete.png" alt="" class="button-icon delete-icon" />
				Löschen
			</button>
		</div>
	{:else}
		<div class="not-found">
			<h1>Material nicht gefunden</h1>
			<p>Das ausgewählte Material existiert nicht.</p>
			<a href="/">Zurück zur Übersicht</a>
		</div>
	{/if}
</section>

<style>
	.detail-page {
		max-width: 900px;
		margin: 0 auto;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 32px;
		color: #111;
		text-decoration: none;
		font-size: 16px;
	}

	.back-icon {
		width: 18px;
		height: 18px;
		object-fit: contain;
	}

	.back-link:hover {
		text-decoration: underline;
	}

	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 32px;
	}

	h1 {
		margin: 0;
		font-size: 28px;
	}

	.fav-btn,
	.download,
	.delete {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 14px 24px;
		border-radius: 8px;
		cursor: pointer;
		font-size: 16px;
	}

	.fav-btn {
		border: 1px solid #6c5dd3;
		background: white;
		color: #6c5dd3;
		padding: 12px 18px;
	}

	.download {
		border: none;
		background: #6c5dd3;
		color: white;
	}

	.delete {
		border: 1px solid #e53935;
		background: white;
		color: #e53935;
	}

	.button-icon {
		width: 20px;
		height: 20px;
		object-fit: contain;
	}

	.delete-icon {
		width: 18px;
		height: 18px;
	}

	.white-icon {
		filter: brightness(0) invert(1);
	}

	.card {
		display: flex;
		align-items: center;
		gap: 28px;
		padding: 24px;
		border: 1px solid #e2e2ea;
		border-radius: 12px 12px 0 0;
	}

	.file-preview {
		width: 90px;
		height: 90px;
		border-radius: 10px;
		background: #f2efff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.file-preview img {
		width: 46px;
		height: 46px;
		object-fit: contain;
	}

	.material-title h2 {
		margin: 0 0 8px;
		font-size: 22px;
	}

	.material-title span {
		background: #ded4fb;
		color: #4f36b8;
		padding: 4px 10px;
		border-radius: 999px;
		font-size: 14px;
	}

	.info {
		margin-bottom: 40px;
		border-left: 1px solid #e2e2ea;
		border-right: 1px solid #e2e2ea;
		border-bottom: 1px solid #e2e2ea;
		border-radius: 0 0 12px 12px;
	}

	.row {
		display: flex;
		justify-content: space-between;
		padding: 18px 24px;
		border-bottom: 1px solid #e2e2ea;
		font-size: 16px;
	}

	.row:last-child {
		border-bottom: none;
	}

	.row strong {
		font-weight: 500;
	}

	.actions {
		display: flex;
		gap: 24px;
	}

	.not-found {
		margin-top: 40px;
	}

	.not-found a {
		color: #6c5dd3;
	}
</style>
