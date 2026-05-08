<script>
	let { form } = $props();

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
</script>

<section class="auth-page">
	<div class="auth-card">
		<h1>Registrieren</h1>
		<p>Erstelle dein Konto für deinen Smart Study Organizer.</p>

		{#if form?.error}
			<div class="error-message">{form.error}</div>
		{/if}

		<form method="POST" class="auth-form">
			<label>
				<span>Name</span>
				<input name="name" bind:value={name} placeholder="Dein Name" required />
			</label>

			<label>
				<span>E-Mail</span>
				<input name="email" type="email" bind:value={email} placeholder="deine@email.ch" required />
			</label>

			<label>
				<span>Passwort</span>

				<div class="password-wrapper">
					<input
						name="password"
						type={showPassword ? 'text' : 'password'}
						bind:value={password}
						placeholder="Mindestens 6 Zeichen + Sonderzeichen"
						required
					/>

					<button
						type="button"
						class="password-toggle"
						onclick={() => (showPassword = !showPassword)}
					>
						<img src={showPassword ? '/images/eye-open.png' : '/images/eye-closed.png'} alt="" />
					</button>
				</div>
			</label>

			<button type="submit">Konto erstellen</button>
		</form>

		<a href="/login" class="switch-link">Schon ein Konto? Einloggen</a>
	</div>
</section>

<style>
	.auth-page {
		min-height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.auth-card {
		width: 100%;
		max-width: 440px;
		background: white;
		border: 1px solid #e2e2ea;
		border-radius: 12px;
		padding: 40px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	}

	h1 {
		margin: 0;
		font-size: 28px;
	}

	p {
		margin: 8px 0 32px;
		color: #555;
		font-size: 16px;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-weight: 600;
		font-size: 15px;
	}

	input {
		height: 52px;
		border: 1px solid #e2e2ea;
		border-radius: 8px;
		padding: 0 16px;
		font-size: 16px;
		box-sizing: border-box;
	}

	input:focus {
		outline: none;
		border-color: #6c5dd3;
		box-shadow: 0 0 0 2px rgba(108, 93, 211, 0.12);
	}

	button {
		height: 52px;
		border: none;
		border-radius: 8px;
		background: #6c5dd3;
		color: white;
		font-size: 16px;
		cursor: pointer;
		margin-top: 8px;
	}

	button:hover {
		opacity: 0.9;
	}

	.error-message {
		background: #fdecea;
		color: #c62828;
		padding: 12px 14px;
		border-radius: 8px;
		margin-bottom: 20px;
		font-size: 15px;
	}

	.switch-link {
		display: inline-block;
		margin-top: 24px;
		color: #6c5dd3;
		text-decoration: none;
		font-size: 15px;
	}

	.switch-link:hover {
		text-decoration: underline;
	}

	.password-wrapper {
		position: relative;
	}

	.password-wrapper input {
		width: 100%;
		padding-right: 52px;
	}

	.password-toggle {
		position: absolute;
		top: 50%;
		right: 14px;
		transform: translateY(-50%);
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.password-toggle img {
		width: 20px;
		height: 20px;
		object-fit: contain;
		opacity: 0.7;
	}

	.password-toggle:hover img {
		opacity: 1;
	}
</style>
