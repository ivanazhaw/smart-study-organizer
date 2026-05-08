<script>
	import MaterialMenu from '$lib/components/MaterialMenu.svelte';
	import FavoriteIcon from '$lib/components/FavoriteIcon.svelte';
	import BackLink from '$lib/components/BackLink.svelte';

	let { data } = $props();

	let materials = $derived(data.materials ?? []);

	function formatLastOpened(value) {
		if (!value) return 'Nie';

		const date = new Date(value);
		const today = new Date();
		const yesterday = new Date();

		yesterday.setDate(today.getDate() - 1);

		const isSameDay = (a, b) =>
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate();

		const time = date.toLocaleTimeString('de-CH', {
			hour: '2-digit',
			minute: '2-digit'
		});

		if (isSameDay(date, today)) {
			return `heute, ${time} Uhr`;
		}

		if (isSameDay(date, yesterday)) {
			return `gestern, ${time} Uhr`;
		}

		return date.toLocaleDateString('de-CH', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}
</script>

<section class="recent-page">
	<div class="page-topbar recent-topbar">
		<div>
			<h1 class="page-title">Zuletzt verwendet</h1>
			<p class="page-subtitle">Materialien, die du zuletzt geöffnet hast.</p>

			<BackLink />
		</div>

		<a href="/add" class="primary-button">+ Material hinzufügen</a>
	</div>

	<div class="data-table">
		<div class="data-table-header recent-table-grid">
			<span>Titel</span>
			<span>Fach</span>
			<span>Typ</span>
			<span>Zuletzt geöffnet</span>
			<span></span>
		</div>

		{#each materials as material}
			<div class="data-table-row recent-table-grid">
				<div class="material-title-cell">
					<a class="material-link" href={`/materials/${material._id}`}>
						<img src="/images/file.png" alt="" class="file-icon" />
						<span>{material.title}</span>
					</a>

					{#if material.favorite}
						<a href="/favorites" class="favorite-link">
							<FavoriteIcon filled={true} />
						</a>
					{/if}
				</div>

				<span>{material.subject}</span>
				<span>{material.type}</span>
				<span>{formatLastOpened(material.lastOpened)}</span>

				<MaterialMenu materialId={material._id} />
			</div>
		{/each}
	</div>
</section>

<style>
	.recent-page {
		width: 100%;
	}

	.recent-topbar {
		margin-bottom: 96px;
	}

	.recent-table-grid {
		grid-template-columns: 2fr 1.2fr 1fr 1.4fr 40px;
	}

	.file-icon {
		width: 22px;
		height: 22px;
		object-fit: contain;
	}

	.favorite-link {
		display: flex;
		align-items: center;
	}

	.favorite-link:hover {
		opacity: 0.8;
	}
</style>
