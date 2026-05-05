<script>
	import { page } from '$app/state';

	let { children } = $props();

	const navItems = [
		{ href: '/', label: 'Übersicht', icon: '⌂' },
		{ href: '/favorites', label: 'Favoriten', icon: '☆' },
		{ href: '/recent', label: 'Zuletzt verwendet', icon: '◷' },
		{ href: '/categories', label: 'Kategorien', icon: '▣' }
	];

	function isActive(href) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<div class="app-shell">
	<aside class="sidebar">
		<div class="logo">
			<div class="logo-icon">🎓</div>
			<div class="logo-text">
				<strong>Smart Study</strong>
				<strong>Organizer</strong>
			</div>
		</div>

		<nav class="nav">
			{#each navItems as item}
				<a href={item.href} class:active={isActive(item.href)}>
					<span class="nav-icon">{item.icon}</span>
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>

		<div class="bottom-nav">
			<a href="/">
				<span class="nav-icon">⚙</span>
				<span>Einstellungen</span>
			</a>
			<a href="/">
				<span class="nav-icon">?</span>
				<span>Hilfe</span>
			</a>
		</div>
	</aside>

	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: Arial, sans-serif;
		background: #f7f7fb;
		color: #111;
	}

	.app-shell {
		min-height: 100vh;
		display: grid;
		grid-template-columns: 300px 1fr;
		padding: 48px;
		box-sizing: border-box;
	}

	.sidebar {
		background: #fbfbfe;
		border-right: 1px solid #ddd;
		padding: 40px 32px;
		display: flex;
		flex-direction: column;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 14px;
		font-size: 18px;
		margin-bottom: 56px;
	}

	.logo-icon {
		font-size: 38px;
	}

	.logo-text {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
	}

	.nav {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.nav a,
	.bottom-nav a {
		text-decoration: none;
		color: #111;
		font-size: 17px;
		padding: 10px 14px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.nav a.active {
		background: #ded4fb;
		color: #4f36b8;
	}

	.nav-icon {
		width: 24px;
		display: inline-block;
		text-align: center;
	}

	.bottom-nav {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.content {
		background: white;
		padding: 48px 56px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
		border-radius: 0 12px 12px 0;
	}
</style>