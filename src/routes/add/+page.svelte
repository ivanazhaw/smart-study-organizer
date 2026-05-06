<script>
	let title = $state('');
	let subject = $state('');
	let type = $state('');
	let note = $state('');
</script>

<section class="add-page">
	<div class="add-container">
		<div class="page-header">
			<div>
				<h1>Neues Material hinzufügen</h1>
				<a href="/" class="back-link">← Zurück zur Übersicht</a>
			</div>
		</div>

		<form class="form">
			<label>
				<span>Titel <strong>*</strong></span>
				<input bind:value={title} placeholder="Titel des Materials eingeben..." />
			</label>

			<label>
				<span>Fach <strong>*</strong></span>
				<input bind:value={subject} placeholder="Fach angeben" />
			</label>

			<label>
				<span>Typ <strong>*</strong></span>
				<select bind:value={type}>
					<option value="" disabled>Material-Typ auswählen</option>
					<option value="PDF">PDF</option>
					<option value="Notizen">Notizen</option>
					<option value="Link">Link</option>
					<option value="Präsentation">Präsentation</option>
					<option value="Übung">Übung</option>
				</select>
			</label>

			<div class="field-group">
				<span class="field-label">Datei</span>

				<label class="upload-box" for="file">
					<input id="file" type="file" />
					<img src="/images/upload.png" alt="Upload" class="upload-icon" />
					<p>Datei hier ziehen oder klicken zum Auswählen</p>
				</label>
			</div>

			<label>
				<span>Notiz</span>
				<input bind:value={note} placeholder="Notizen hinzufügen..." />
			</label>

			<div class="actions">
				<a href="/" class="cancel-button">Abbrechen</a>
				<button type="button" class="save-button">Speichern</button>
			</div>
		</form>
	</div>
</section>

<style>
	.add-page {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.add-container {
		width: 100%;
		max-width: 820px;
	}

	.page-header {
		margin-bottom: 32px;
	}

	h1 {
		margin: 0 0 8px;
		font-size: 28px;
	}

	.back-link {
		color: #111;
		text-decoration: none;
		font-size: 16px;
	}

	.back-link:hover {
		text-decoration: underline;
	}

	.form {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	label,
	.field-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 16px;
		font-weight: 600;
	}

	.field-label {
		font-size: 16px;
		font-weight: 600;
	}

	strong {
		color: #e53935;
	}

	input,
	select {
		height: 52px;
		border: 1px solid #e2e2ea;
		border-radius: 8px;
		padding: 0 16px;
		font-size: 16px;
		background: white;
		box-sizing: border-box;
		width: 100%;
	}

	input:focus,
	select:focus {
		outline: none;
		border-color: #6c5dd3;
		box-shadow: 0 0 0 2px rgba(108, 93, 211, 0.12);
	}

	.upload-box {
		height: 140px;
		border: 1px solid #e2e2ea;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #555;
		background: white;
		cursor: pointer;
		box-sizing: border-box;
	}

	.upload-box input {
		display: none;
	}

	.upload-icon {
		width: 40px;
		height: 40px;
		object-fit: contain;
		margin-bottom: 8px;
	}

	.upload-box p {
		margin: 0;
		font-size: 15px;
		font-weight: 400;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 24px;
		margin-top: 8px;
	}

	.cancel-button,
	.save-button {
		min-width: 140px;
		height: 52px;
		border-radius: 8px;
		font-size: 16px;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.cancel-button {
		background: white;
		color: #111;
		border: 1px solid #999;
	}

	.save-button {
		background: #6c5dd3;
		color: white;
		border: none;
		cursor: pointer;
	}

	.save-button:hover,
	.cancel-button:hover {
		opacity: 0.9;
	}
</style>
