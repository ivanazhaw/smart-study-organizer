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
		<div class="landing-card">
			<h1>Smart Study Organizer</h1>

			<p>Organisiere deine Lernmaterialien einfach, modern und übersichtlich an einem Ort.</p>

			<div class="landing-actions">
				<a href="/login" class="primary-button">Einloggen</a>

				<a href="/register" class="secondary-button">Registrieren</a>
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
		min-height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.landing-card {
		max-width: 520px;
		text-align: center;
		padding: 48px;
		border: 1px solid #e2e2ea;
		border-radius: 16px;
		background: white;
		box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
	}

	.landing-card h1 {
		margin: 0;
		font-size: 36px;
	}

	.landing-card p {
		margin: 16px 0 32px;
		font-size: 18px;
		color: #555;
	}

	.landing-actions {
		display: flex;
		justify-content: center;
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
</style>
