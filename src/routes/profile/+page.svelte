<script>
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { data, form } = $props();

	let currentPassword = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');

	let user = $derived(data.user);
</script>

<section class="profile-page">
	<div class="page-topbar">
		<div>
			<h1 class="page-title">Dein Profil</h1>
			<p class="page-subtitle">Deine Kontoinformationen und Sitzungsverwaltung.</p>
		</div>
	</div>

	<div class="profile-grid">
		<div class="profile-card profile-overview-card">
			<div class="profile-avatar">
				{user?.name?.charAt(0).toUpperCase() || '?'}
			</div>

			<div>
				<h2>{user?.name}</h2>
				<p>{user?.email}</p>
			</div>
		</div>

		<div class="profile-card">
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

		<div class="profile-card">
			<h2>Speicherung</h2>

			<p class="card-text">
				Deine Materialien werden deinem Konto zugeordnet. Andere Nutzer sehen deine hochgeladenen
				Materialien nicht.
			</p>
		</div>

		<div class="profile-card session-card">
			<div>
				<h2>Sitzung</h2>

				<p class="card-text">
					Du bist aktuell angemeldet. Beim Ausloggen bleiben deine Materialien sicher gespeichert
					und sind beim nächsten Login wieder verfügbar.
				</p>
			</div>

			<div class="session-status">
				<span class="status-dot"></span>
				<span>Aktive Sitzung</span>
			</div>
		</div>

		<div class="profile-card">
			<h2>Passwort ändern</h2>

			<p class="card-text">
				Das neue Passwort muss mindestens 6 Zeichen und ein Sonderzeichen enthalten.
			</p>

			{#if form?.passwordError}
				<div class="password-message error">{form.passwordError}</div>
			{/if}

			{#if form?.passwordSuccess}
				<div class="password-message success">{form.passwordSuccess}</div>
			{/if}

			<form method="POST" action="?/changePassword" class="password-form">
				<label>
					<span>Aktuelles Passwort</span>
					<input
						name="currentPassword"
						type="password"
						bind:value={currentPassword}
						placeholder="Aktuelles Passwort"
						required
					/>
				</label>

				<label>
					<span>Neues Passwort</span>
					<input
						name="newPassword"
						type="password"
						bind:value={newPassword}
						placeholder="Mindestens 6 Zeichen + Sonderzeichen"
						required
					/>
				</label>

				<label>
					<span>Neues Passwort bestätigen</span>
					<input
						name="confirmPassword"
						type="password"
						bind:value={confirmPassword}
						placeholder="Neues Passwort wiederholen"
						required
					/>
				</label>

				<button type="submit" class="password-button">Passwort speichern</button>
			</form>
		</div>

		<div class="profile-card">
			<h2>Darstellung</h2>

			<p class="card-text">Wähle zwischen hellem und dunklem Design.</p>

			<div class="theme-section">
				<ThemeToggle />
			</div>
		</div>
	</div>
</section>

<style>
	.profile-page {
		width: 100%;
	}

	.profile-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 24px;
	}

	.profile-card {
		background: white;
		border: 1px solid #e2e2ea;
		border-radius: 14px;
		padding: 28px;
	}

	.profile-card h2 {
		margin: 0 0 20px;
		font-size: 22px;
	}

	.profile-card p {
		margin: 0;
		color: #555;
	}

	.profile-overview-card {
		display: flex;
		align-items: center;
		gap: 18px;
		grid-column: 1 / -1;
	}

	.profile-overview-card h2 {
		margin: 0 0 6px;
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
		flex-shrink: 0;
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
	}

	@media (max-width: 800px) {
		.profile-grid {
			grid-template-columns: 1fr;
		}
	}

	.theme-section {
		margin-top: 22px;
	}

	.password-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-top: 22px;
	}

	.password-form label {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 15px;
		font-weight: 600;
	}

	.password-form input {
		height: 48px;
		border: 1px solid #e2e2ea;
		border-radius: 8px;
		padding: 0 14px;
		font-size: 15px;
		box-sizing: border-box;
	}

	.password-form input:focus {
		outline: none;
		border-color: #6c5dd3;
		box-shadow: 0 0 0 2px rgba(108, 93, 211, 0.12);
	}

	.password-button {
		align-self: flex-start;
		background: #6c5dd3;
		color: white;
		border: none;
		border-radius: 8px;
		padding: 12px 22px;
		font-size: 15px;
		cursor: pointer;
	}

	.password-button:hover {
		opacity: 0.9;
	}

	.password-message {
		margin-top: 18px;
		padding: 12px 14px;
		border-radius: 8px;
		font-size: 15px;
	}

	.password-message.error {
		background: #fdecea;
		color: #c62828;
	}

	.password-message.success {
		background: #e8f5e9;
		color: #2e7d32;
	}

	.session-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 220px;
	}

	.session-status {
		margin-top: 28px;
		display: inline-flex;
		align-items: center;
		gap: 10px;
		color: #2e7d32;
		font-weight: 600;
	}

	.status-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #2e7d32;
	}

	:global(:root[data-theme='dark']) .session-status {
		color: #7ddc8a;
	}

	:global(:root[data-theme='dark']) .status-dot {
		background: #7ddc8a;
	}
</style>
