<script>
	import MaterialMenu from '$lib/components/MaterialMenu.svelte';
	import FavoriteIcon from '$lib/components/FavoriteIcon.svelte';
	import { formatDate } from '$lib/utils/date';

	let { data } = $props();

	let search = $state('');
	let selectedSubject = $state('Alle Fächer');

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
</script>

{#if !data.user}
	<section class="landing-page">
		<div class="landing-content">
			<div class="landing-left">
				<div class="landing-logo">
					<img src="/images/logo.png" alt="" />
					<span>Smart Study Organizer</span>
				</div>

				<h1>Deine Lernmaterialien. Ein Ort. Immer organisiert.</h1>

				<p>
					Speichere Unterlagen, Notizen und PDFs übersichtlich nach Fach, Favoriten und zuletzt
					verwendeten Materialien.
				</p>

				<div class="landing-benefits">
					<span>✓ Materialien hochladen</span>
					<span>✓ Favoriten speichern</span>
					<span>✓ Zuletzt verwendete Dateien finden</span>
					<span>✓ Nach Fächern sortieren</span>
				</div>

				<div class="landing-actions">
					<a href="/login" class="primary-button">Einloggen</a>
					<a href="/register" class="secondary-button">Registrieren</a>
				</div>
			</div>

			<div class="landing-preview">
				<div class="upload-card">
					<div class="upload-icon">
						<img src="/images/upload.png" alt="" />
					</div>

					<h2>Material hochladen</h2>
					<p>PDFs, Notizen und Lernunterlagen an einem Ort sammeln.</p>

					<div class="upload-dropzone">
						<img src="/images/file.png" alt="" />
						<span>Datei auswählen oder ablegen</span>
					</div>
				</div>

				<div class="feature-grid">
					<div class="feature-card">
						<img src="/images/search.png" alt="" />
						<span>Schnell suchen</span>
					</div>

					<div class="feature-card">
						<img src="/images/favorites-filled.png" alt="" />
						<span>Favoriten</span>
					</div>

					<div class="feature-card">
						<img src="/images/categories.png" alt="" />
						<span>Kategorien</span>
					</div>

					<div class="feature-card">
						<img src="/images/recent.png" alt="" />
						<span>Zuletzt genutzt</span>
					</div>
				</div>
			</div>
		</div>
	</section>
{:else}
	<section class="home">
		<div class="page-topbar home-topbar">
			<div>
				<h1 class="page-title">Willkommen zurück, {data.user.name}!</h1>
				<p class="page-subtitle">Finde schnell dein Lernmaterial.</p>
			</div>

			<div class="topbar-actions">
				<a href="/logout" class="logout-button">Ausloggen</a>
				<a href="/add" class="primary-button">+ Material hinzufügen</a>
			</div>
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

		<div class="data-table">
			<div class="data-table-header home-table-grid">
				<span>Titel</span>
				<span>Fach</span>
				<span>Typ</span>
				<span>Hinzugefügt am</span>
				<span></span>
			</div>

			{#each filteredMaterials as material}
				<div class="data-table-row home-table-grid">
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

					<span>{material.subject}</span>
					<span>{material.type}</span>
					<span>{formatDate(material.date || material.createdAt)}</span>

					<MaterialMenu materialId={material._id} />
				</div>
			{/each}

			{#if filteredMaterials.length === 0}
				<div class="empty-state">Keine passenden Materialien gefunden.</div>
			{/if}
		</div>
	</section>
{/if}

<style>
	.home {
		width: 100%;
	}

	.home-topbar {
		margin-bottom: 64px;
	}

	.topbar-actions {
		display: flex;
		align-items: center;
		gap: 14px;
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

	.home-table-grid {
		grid-template-columns: 2fr 1.2fr 1fr 1.2fr 40px;
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

	.favorite-link {
		display: flex;
		align-items: center;
	}

	.favorite-link:hover {
		opacity: 0.8;
	}

	.landing-page {
		min-height: calc(100vh - 96px);
		display: flex;
		align-items: center;
		justify-content: center;
		background:
			radial-gradient(circle at top left, #eee9ff 0, transparent 35%),
			radial-gradient(circle at bottom right, #f6f2ff 0, transparent 30%);
		border-radius: 18px;
		padding: 48px;
		box-sizing: border-box;
	}

	.landing-content {
		width: 100%;
		max-width: 1100px;
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 48px;
		align-items: center;
	}

	.landing-logo {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 28px;
		font-weight: 700;
		color: #4f36b8;
	}

	.landing-logo img {
		width: 42px;
		height: 42px;
		object-fit: contain;
	}

	.landing-left h1 {
		margin: 0;
		font-size: 48px;
		line-height: 1.1;
		max-width: 620px;
	}

	.landing-left p {
		margin: 22px 0 28px;
		font-size: 18px;
		line-height: 1.5;
		color: #555;
		max-width: 560px;
	}

	.landing-benefits {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 14px;
		margin-bottom: 32px;
		color: #333;
		font-size: 16px;
	}

	.landing-benefits span {
		background: white;
		border: 1px solid #e2e2ea;
		border-radius: 10px;
		padding: 12px 14px;
	}

	.landing-actions {
		display: flex;
		gap: 16px;
	}

	.secondary-button,
	.logout-button {
		border: 1px solid #6c5dd3;
		color: #6c5dd3;
		background: white;
		text-decoration: none;
		padding: 14px 28px;
		border-radius: 8px;
		font-size: 16px;
	}

	.logout-button {
		border-color: #ddd;
		color: #111;
	}

	.landing-preview {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.upload-card {
		background: white;
		border: 1px solid #e2e2ea;
		border-radius: 20px;
		padding: 28px;
		box-shadow: 0 18px 40px rgba(108, 93, 211, 0.14);
	}

	.upload-icon {
		width: 54px;
		height: 54px;
		border-radius: 14px;
		background: #f2efff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 18px;
	}

	.upload-icon img {
		width: 26px;
		height: 26px;
		object-fit: contain;
		filter: brightness(0) saturate(100%) invert(39%) sepia(57%) saturate(1032%) hue-rotate(218deg)
			brightness(89%) contrast(89%);
	}

	.upload-card h2 {
		margin: 0 0 8px;
		font-size: 24px;
	}

	.upload-card p {
		margin: 0 0 22px;
		color: #555;
		line-height: 1.5;
	}

	.upload-dropzone {
		border: 1px dashed #b6a8f2;
		border-radius: 14px;
		background: #fbfaff;
		padding: 22px;
		display: flex;
		align-items: center;
		gap: 14px;
		color: #4f36b8;
		font-weight: 600;
	}

	.upload-dropzone img {
		width: 28px;
		height: 28px;
		object-fit: contain;
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 14px;
	}

	.feature-card {
		background: white;
		border: 1px solid #e2e2ea;
		border-radius: 16px;
		padding: 18px;
		display: flex;
		align-items: center;
		gap: 12px;
		box-shadow: 0 8px 22px rgba(0, 0, 0, 0.04);
	}

	.feature-card img {
		width: 24px;
		height: 24px;
		object-fit: contain;
	}

	.feature-card span {
		font-weight: 600;
		color: #333;
	}

	@media (max-width: 900px) {
		.landing-content {
			grid-template-columns: 1fr;
		}

		.landing-left h1 {
			font-size: 36px;
		}

		.landing-benefits,
		.feature-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
