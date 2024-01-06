<div class="fixed z-20 h-screen w-screen bg-black bg-opacity-75">
	<div class="bright flex h-full w-full items-center justify-center gap-3">
		<div class="yellow-bright">
			<div class="hive yellow-hive bright aspect-[65/220] w-[58px] bg-ucab-yellow"></div>
		</div>
		<div class="green-bright">
			<div class="hive green-hive aspect-[65/220] w-[58px] bg-ucab-green"></div>
		</div>
		<div class="blue-bright">
			<div class="hive blue-hive aspect-[65/220] w-[58px] bg-ucab-blue"></div>
		</div>
	</div>
</div>

<style>
	.hive {
		clip-path: polygon(
			55% 0%,
			55% 10%,
			100% 25%,
			100% 75%,
			55% 90%,
			55% 100%,
			45% 100%,
			45% 90%,
			0% 75%,
			0% 25%,
			45% 10%,
			45% 0%
		);
		opacity: 30%;
		scale: 0.95;
	}

	.yellow-hive {
		animation:
			2s fade infinite,
			2s bounce infinite;
	}

	.green-hive {
		animation:
			2s fade 0.66s infinite,
			2s bounce 0.66s infinite;
	}

	.blue-hive {
		animation:
			2s fade 1.32s infinite,
			2s bounce 1.32s infinite;
	}

	.yellow-bright {
		--color: theme('colors.ucab-yellow');
		animation: 2s bright infinite;
	}

	.green-bright {
		--color: theme('colors.ucab-green');
		animation: 2s bright 0.66s infinite;
	}

	.blue-bright {
		--color: theme('colors.ucab-blue');
		animation: 2s bright 1.32s infinite;
	}

	@keyframes fade {
		0% {
			opacity: 30%;
		}
		37.5% {
			opacity: 100%;
		}
		75% {
			opacity: 30%;
		}
	}

	@keyframes bounce {
		0% {
			scale: 0.95;
		}
		37.5% {
			scale: 1.1;
		}
		75% {
			scale: 0.95;
		}
	}

	@keyframes bright {
		0% {
			filter: drop-shadow(0px 0px 0px var(--color));
		}
		37.5% {
			filter: drop-shadow(0px 0px 50px var(--color));
		}
		75% {
			filter: drop-shadow(0px 0px 0px var(--color));
		}
	}
</style>
