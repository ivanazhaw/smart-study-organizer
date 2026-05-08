<script>
	import BackLink from '$lib/components/BackLink.svelte';

	let { data, form } = $props();

	let material = $derived(data.material);

	let selectedType = $derived(material.type);
	let selectedFileName = $state('');

	let acceptedFileTypes = $derived(
		selectedType === 'PDF'
			? '.pdf'
			: selectedType === 'Notizen'
				? '.txt,.md'
				: selectedType === 'Präsentation'
					? '.ppt,.pptx'
					: selectedType === 'Docx'
						? '.doc,.docx'
						: ''
	);

	function handleFileChange(event) {
		const file = event.target.files[0];
		selectedFileName = file ? file.name : '';
	}
</script>

<section class="edit-page">
	<h1>Material bearbeiten</h1>

	<BackLink href={`/materials/${material._id}`} text="Zurück zur Detailansicht" />

	{#if form?.error}
		<div class="error-message">{form.error}</div>
	{/if}

	<form method="POST" action="?/update" enctype="multipart/form-data" class="form">
		<div class="field">
			<label for="title">Titel</label>
			<input id="title" name="title" value={material.title} required />
		</div>

		<div class="field">
			<label for="subject">Fach</label>
			<input id="subject" name="subject" value={material.subject} required />
		</div>

		<div class="field">
			<label for="type">Typ</label>

			<select
				id="type"
				name="type"
				value={selectedType}
				onchange={(event) => {
					selectedType = event.target.value;
				}}
				required
			>
				<option value="PDF">PDF</option>
				<option value="Notizen">Notizen</option>
				<option value="Link">Link</option>
				<option value="Präsentation">Präsentation</option>
				<option value="Docx">Docx</option>
			</select>
		</div>

		<div class="field">
			<label for="note">Notiz</label>
			<textarea id="note" name="note">{material.note}</textarea>
		</div>

		<div class="field">
			<label for="file">Datei</label>

			<label class="upload-box" for="file">
				<input
					id="file"
					name="file"
					type="file"
					accept={acceptedFileTypes}
					onchange={handleFileChange}
				/>

				<img src="/images/upload.png" alt="" class="upload-icon" />

				{#if selectedFileName}
					<p class="selected-file">{selectedFileName}</p>
				{:else if selectedType === 'Link'}
					<p>Beim Typ Link wird keine Datei hochgeladen.</p>
				{:else if material.fileName}
					<p>Aktuelle Datei: {material.fileName}</p>
					<p class="file-hint">Erlaubte Formate: {acceptedFileTypes}</p>
				{:else if selectedType}
					<p>Datei hinzufügen</p>
					<p class="file-hint">Erlaubte Formate: {acceptedFileTypes || 'keine Datei'}</p>
				{:else}
					<p>Datei hinzufügen</p>
				{/if}
			</label>
		</div>

		<div class="actions">
			<a href={`/materials/${material._id}`} class="cancel-btn">Abbrechen</a>
			<button type="submit" class="save-btn">Speichern</button>
		</div>
	</form>
</section>

<style>
	.edit-page {
		max-width: 800px;
		margin: 0 auto;
	}

	h1 {
		font-size: 32px;
		margin-bottom: 12px;
	}

	.error-message {
		background: #fdecea;
		color: #c62828;
		padding: 14px 16px;
		border-radius: 8px;
		margin: 24px 0;
		font-size: 15px;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 28px;
		margin-top: 28px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	label {
		font-weight: 600;
		font-size: 15px;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 16px;
		border: 1px solid #ddd;
		border-radius: 10px;
		font-size: 16px;
		font-family: inherit;
		box-sizing: border-box;
		background: white;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: #6c5dd3;
	}

	textarea {
		min-height: 180px;
		resize: vertical;
	}

	.upload-box {
		height: 150px;
		border: 1px solid #ddd;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #555;
		background: white;
		cursor: pointer;
		box-sizing: border-box;
		padding: 20px;
		text-align: center;
		transition: border-color 0.2s ease;
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
		text-align: center;
	}

	.upload-box p + p {
		margin-top: 6px;
	}

	.selected-file {
		color: #6c5dd3;
		font-weight: 600;
	}

	.file-hint {
		color: #777;
		font-size: 13px;
	}

	.actions {
		display: flex;
		gap: 18px;
		margin-top: 20px;
	}

	.cancel-btn,
	.save-btn {
		padding: 14px 26px;
		border-radius: 10px;
		font-size: 16px;
		text-decoration: none;
		cursor: pointer;
		transition: 0.2s ease;
	}

	.cancel-btn {
		background: white;
		border: 1px solid #ccc;
		color: #111;
	}

	.cancel-btn:hover {
		background: #f5f5f5;
	}

	.save-btn {
		background: #6c5dd3;
		border: none;
		color: white;
	}

	.save-btn:hover {
		opacity: 0.9;
	}
</style>
