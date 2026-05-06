<script>
	let { data } = $props();

	let material = $derived(data.material);

	let selectedFileName = $state('');

	function handleFileChange(event) {
		const file = event.target.files[0];
		selectedFileName = file ? file.name : '';
	}
</script>

<section class="edit-page">
	<h1>Material bearbeiten</h1>

	<a href={`/materials/${material._id}`} class="back-link"> ← Zurück zur Detailansicht </a>

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

			<select id="type" name="type">
				<option value="PDF" selected={material.type === 'PDF'}> PDF </option>

				<option value="Notizen" selected={material.type === 'Notizen'}> Notizen </option>
			</select>
		</div>

		<div class="field">
			<label for="note">Notiz</label>

			<textarea id="note" name="note"> {material.note}</textarea>
		</div>

		<div class="field">
			<label for="file">Datei</label>

			<label class="upload-box" for="file">
				<input id="file" name="file" type="file" onchange={handleFileChange} />

				<img src="/images/upload.png" alt="" class="upload-icon" />

				{#if selectedFileName}
					<p class="selected-file">
						{selectedFileName}
					</p>
				{:else if material.fileName}
					<p>
						Aktuelle Datei:
						{material.fileName}
					</p>
				{:else}
					<p>Datei hinzufügen</p>
				{/if}
			</label>
		</div>

		<div class="actions">
			<a href={`/materials/${material._id}`} class="cancel-btn"> Abbrechen </a>

			<button type="submit" class="save-btn"> Speichern </button>
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

	.back-link {
		display: inline-block;
		margin-bottom: 40px;
		color: #555;
		text-decoration: none;
	}

	.back-link:hover {
		text-decoration: underline;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 28px;
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
		height: 140px;
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

	.selected-file {
		color: #6c5dd3;
		font-weight: 600;
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
