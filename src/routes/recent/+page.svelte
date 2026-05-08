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
	<div class="topbar">
		<div>
			<h1>Zuletzt verwendet</h1>
			<p>Materialien, die du zuletzt geöffnet hast.</p>
			<BackLink />
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

	.title-cell,
	.material-link,
	.favorite-link {
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
</style>
