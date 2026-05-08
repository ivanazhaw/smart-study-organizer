<section class="help-page">
	<div class="page-topbar">
		<div>
			<h1 class="page-title">Hilfe</h1>
			<p class="page-subtitle">So nutzt du deinen Smart Study Organizer.</p>
		</div>
	</div>

	<div class="help-grid">
		<div class="help-card">
			<img src="/images/upload.png" alt="" />
			<h2>Material hinzufügen</h2>
			<p>
				Klicke auf „+ Material hinzufügen“, gib Titel, Fach und Typ ein und lade optional eine Datei
				hoch.
			</p>
		</div>

		<div class="help-card">
			<img src="/images/favorites-filled.png" alt="" />
			<h2>Favoriten nutzen</h2>
			<p>
				Markiere wichtige Materialien als Favorit, damit du sie später schnell auf der
				Favoriten-Seite findest.
			</p>
		</div>

		<div class="help-card">
			<img src="/images/recent.png" alt="" />
			<h2>Zuletzt verwendet</h2>
			<p>Sobald du ein Material öffnest, erscheint es automatisch in „Zuletzt verwendet“.</p>
		</div>

		<div class="help-card">
			<img src="/images/categories.png" alt="" />
			<h2>Kategorien</h2>
			<p>
				Alle Materialien werden automatisch nach Fach gruppiert. So findest du deine Unterlagen
				schneller.
			</p>
		</div>
	</div>

	<div class="faq-section">
		<h2>Häufige Fragen</h2>

		<div class="faq-item">
			<h3>Wer sieht meine Materialien?</h3>
			<p>Nur du. Materialien werden deinem eingeloggten Konto zugeordnet.</p>
		</div>

		<div class="faq-item">
			<h3>Kann ich Dateien herunterladen?</h3>
			<p>Ja. In der Detailansicht kannst du vorhandene Dateien öffnen oder herunterladen.</p>
		</div>

		<div class="faq-item">
			<h3>Kann ich Materialien bearbeiten?</h3>
			<p>Ja. Über die Detailansicht oder das Drei-Punkte-Menü kannst du Materialien bearbeiten.</p>
		</div>

		<div class="faq-item">
			<h3>Was passiert beim Löschen?</h3>
			<p>
				Das Material wird entfernt. Falls eine Datei vorhanden ist, wird sie ebenfalls gelöscht.
			</p>
		</div>
	</div>
</section>

<style>
	.help-page {
		width: 100%;
	}

	.help-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 24px;
		margin-bottom: 40px;
	}

	.help-card {
		background: white;
		border: 1px solid #e2e2ea;
		border-radius: 14px;
		padding: 28px;
	}

	.help-card img {
		width: 34px;
		height: 34px;
		object-fit: contain;
		margin-bottom: 16px;
	}

	.help-card h2 {
		margin: 0 0 10px;
		font-size: 22px;
	}

	.help-card p {
		margin: 0;
		color: #555;
		line-height: 1.5;
	}

	.faq-section {
		background: white;
		border: 1px solid #e2e2ea;
		border-radius: 14px;
		padding: 28px;
	}

	.faq-section h2 {
		margin: 0 0 24px;
		font-size: 24px;
	}

	.faq-item {
		padding: 18px 0;
		border-bottom: 1px solid #e2e2ea;
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-item h3 {
		margin: 0 0 8px;
		font-size: 18px;
	}

	.faq-item p {
		margin: 0;
		color: #555;
		line-height: 1.5;
	}

	@media (max-width: 800px) {
		.help-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
