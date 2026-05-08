<script>
	import BackLink from '$lib/components/BackLink.svelte';

	let { form } = $props();

	let title = $state('');
	let subject = $state('');
	let type = $state('');
	let note = $state('');
	let selectedFileName = $state('');

	let acceptedFileTypes = $derived(
		type === 'PDF'
			? '.pdf'
			: type === 'Notizen'
				? '.txt,.md'
				: type === 'Präsentation'
					? '.ppt,.pptx'
					: type === 'Docx'
						? '.doc,.docx'
						: ''
	);

	function handleFileChange(event) {
		const file = event.target.files[0];
		selectedFileName = file ? file.name : '';
	}
</script>

<section class="add-page">
	<div class="add-container">
		<div class="page-header">
			<div>
				<h1>Neues Material hinzufügen</h1>
				<BackLink />
			</div>
		</div>

		{#if form?.error}
			<div class="error-message">{form.error}</div>
		{/if}

		<form class="form" method="POST" enctype="multipart/form-data">
			<label>
				<span>Titel <strong>*</strong></span>
				<input
					name="title"
					bind:value={title}
					placeholder="Titel des Materials eingeben..."
					required
				/>
			</label>

			<label>
				<span>Fach <strong>*</strong></span>
				<input name="subject" bind:value={subject} placeholder="Fach angeben" required />
			</label>

			<label>
				<span>Typ <strong>*</strong></span>
				<select name="type" bind:value={type} required>
					<option value="" disabled>Material-Typ auswählen</option>
					<option value="PDF">PDF</option>
					<option value="Notizen">Notizen</option>
					<option value="Link">Link</option>
					<option value="Präsentation">Präsentation</option>
					<option value="Docx">Docx</option>
				</select>
			</label>

			<div class="field-group">
				<span class="field-label">Datei</span>

				<label class="upload-box" for="file">
					<input
						id="file"
						name="file"
						type="file"
						accept={acceptedFileTypes}
						onchange={handleFileChange}
					/>

					<img src="/images/upload.png" alt="Upload" class="upload-icon" />

					{#if selectedFileName}
						<p class="selected-file">{selectedFileName}</p>
					{:else if type === 'Link'}
						<p>Beim Typ Link wird keine Datei hochgeladen.</p>
					{:else if type}
						<p>Erlaubte Formate: {acceptedFileTypes || 'keine Datei'}</p>
					{:else}
						<p>Datei hier ziehen oder klicken zum Auswählen</p>
					{/if}
				</label>
			</div>

			<label>
				<span>Notiz</span>
				<input name="note" bind:value={note} placeholder="Notizen hinzufügen..." />
			</label>

			<div class="actions">
				<a href="/" class="cancel-button">Abbrechen</a>
				<button type="submit" class="save-button">Speichern</button>
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

	.error-message {
		background: #fdecea;
		color: #c62828;
		padding: 14px 16px;
		border-radius: 8px;
		margin-bottom: 24px;
		font-size: 15px;
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
		text-align: center;
		padding: 20px;
	}

	.upload-box:hover {
		border-color: #6c5dd3;
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

	.selected-file {
		color: #6c5dd3;
		font-weight: 600;
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
