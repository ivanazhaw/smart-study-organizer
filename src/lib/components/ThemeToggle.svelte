<script>
	import { browser } from '$app/environment';

	let theme = $state('light');

	function applyTheme(value) {
		theme = value;

		if (browser) {
			document.documentElement.dataset.theme = value;
			localStorage.setItem('theme', value);
		}
	}

	$effect(() => {
		if (browser) {
			theme = document.documentElement.dataset.theme || 'light';
		}
	});
</script>

<div class="theme-toggle">
	<button type="button" class:active={theme === 'light'} onclick={() => applyTheme('light')}>
		<img src="/images/light.png" alt="" />
		<span>Light</span>
	</button>

	<button type="button" class:active={theme === 'dark'} onclick={() => applyTheme('dark')}>
		<img src="/images/dark.png" alt="" />
		<span>Dark</span>
	</button>
</div>

<style>
	.theme-toggle {
		display: inline-flex;
		gap: 8px;
		padding: 6px;
		background: var(--table-header-bg);
		border-radius: 12px;
	}

	button {
		border: none;
		background: transparent;
		padding: 10px 16px;
		border-radius: 10px;
		cursor: pointer;
		font-size: 15px;
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--text-color);
	}

	button img {
		width: 18px;
		height: 18px;
		object-fit: contain;
	}

	button.active {
		background: #6c5dd3;
		color: white;
	}
</style>
