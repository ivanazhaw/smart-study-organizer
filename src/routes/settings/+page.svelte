<script>
	let { data } = $props();

	let user = $derived(data.user);
</script>

<section class="settings-page">
	<div class="page-topbar">
		<div>
			<h1 class="page-title">Einstellungen</h1>
			<p class="page-subtitle">Verwalte dein Konto und deine App-Einstellungen.</p>
		</div>
	</div>

	<div class="settings-grid">
		<div class="settings-card profile-card">
			<div class="profile-avatar">
				{user?.name?.charAt(0).toUpperCase() || '?'}
			</div>

			<div>
				<h2>{user?.name}</h2>
				<p>{user?.email}</p>
			</div>
		</div>

		<div class="settings-card">
			<h2>Konto</h2>

			<div class="info-row">
				<span>Name</span>
				<strong>{user?.name}</strong>
			</div>

			<div class="info-row">
				<span>E-Mail</span>
				<strong>{user?.email}</strong>
			</div>

			<div class="info-row">
				<span>Status</span>
				<strong>Angemeldet</strong>
			</div>
		</div>

		<div class="settings-card">
			<h2>Speicherung</h2>

			<p class="card-text">
				Deine Materialien werden deinem Konto zugeordnet. Andere Nutzer sehen deine hochgeladenen
				Materialien nicht.
			</p>
		</div>

		<div class="settings-card danger-card">
			<h2>Sitzung</h2>

			<p class="card-text">
				Du kannst dich jederzeit ausloggen. Deine Materialien bleiben gespeichert.
			</p>

			<a href="/logout" class="logout-action">Ausloggen</a>
		</div>
	</div>
</section>

<style>
	.settings-page {
		width: 100%;
	}

	.settings-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 24px;
	}

	.settings-card {
		background: white;
		border: 1px solid #e2e2ea;
		border-radius: 14px;
		padding: 28px;
	}

	.settings-card h2 {
		margin: 0 0 20px;
		font-size: 22px;
	}

	.profile-card {
		display: flex;
		align-items: center;
		gap: 18px;
		grid-column: 1 / -1;
	}

	.profile-avatar {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: #ded4fb;
		color: #4f36b8;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28px;
		font-weight: 700;
	}

	.profile-card h2 {
		margin: 0 0 6px;
	}

	.profile-card p {
		margin: 0;
		color: #555;
	}

	.info-row {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		padding: 16px 0;
		border-bottom: 1px solid #e2e2ea;
	}

	.info-row:last-child {
		border-bottom: none;
	}

	.info-row span,
	.card-text {
		color: #555;
	}

	.info-row strong {
		font-weight: 600;
		text-align: right;
	}

	.card-text {
		line-height: 1.5;
		margin: 0;
	}

	.logout-action {
		display: inline-flex;
		margin-top: 22px;
		background: #6c5dd3;
		color: white;
		text-decoration: none;
		padding: 12px 22px;
		border-radius: 8px;
	}

	@media (max-width: 800px) {
		.settings-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
