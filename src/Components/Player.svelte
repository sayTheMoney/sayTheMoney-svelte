<script lang="ts">
	import { alipay } from "../lib/tts";
	import { parse } from "../lib/parser";
	import merger from "../lib/audio-merger";
	import { onMount } from "svelte";
	import Icon from "./Icon.svelte";
	import Tooltip from "./Tooltip.svelte";

	const MAX_VALUE = 9999_9999_9999;
	const MIN_VALUE = 1

	let money: number;
	let audioContainer: HTMLElement;
	let download: { link: string; name: string };
	let audio: HTMLAudioElement;
	let playing: boolean = false;

	$: money = Math.max(Math.min(money, MAX_VALUE), MIN_VALUE);
	$: updateAudio(money)

	onMount(() => {
		randomize();
	});

	const randomize = () => {
		money = Math.round(Math.random() * 999999999) / 100.0;
	};

	const removeAllChildren = (el: HTMLElement) => {
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}
	};

	const updateAudio = async (money: number):Promise<void> => {
		const tokens = parse(money);
		console.debug(tokens);
		const merged = await merger.concat(
			...alipay.begin(),
			...tokens.map((token) => alipay.use(token)),
			...alipay.end()
		);
		const { element, url } = await merger.export(merged);
		removeAllChildren(audioContainer);
		download = {
			link: url,
			name: `alipay_${money.toFixed(2).replace(".", "_")}.mp3`,
		};
		audioContainer.appendChild(element);
		audio = element;
		audio.onplaying = () => {
			playing = true;
		};
		audio.onpause = () => {
			playing = false;
		};
	};

	const togglePlay = async () => {
		if (playing) {
			audio.pause();
			audio.currentTime = 0;
		} else {
			audio.play();
		}
	};
</script>

<main>
	<div id="ui">
		<input
			id="money-input"
			type="number"
			max={MAX_VALUE}
			min={MIN_VALUE}
			bind:value={money}
		/>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a on:click={randomize} href="#">
			<span>
				<Tooltip tooltip="随机">
					<Icon icon="refresh" animationType="pulse" />
				</Tooltip>
			</span>
		</a>
		{#if audio}
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a on:click={togglePlay} href="#">
				{#if playing}
					<span>
						<Tooltip tooltip="暂停">
							<Icon icon="pause-circle" animationType="pulse" />
						</Tooltip>
					</span>
				{:else}
					<span>
						<Tooltip tooltip="播放">
							<Icon icon="play-circle" animationType="pulse" />
						</Tooltip>
					</span>
				{/if}
			</a>
		{/if}
		{#if download}
			<Tooltip tooltip="下载">
				<a href={download.link} download={download.name}>
					<Icon icon="download" animationType="pulse" />
				</a>
			</Tooltip>
		{/if}
	</div>

	<div bind:this={audioContainer} hidden />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	@media (min-width: 960px) {
		main {
			max-width: 50%;
		}
	}

	#ui {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#ui > input {
		margin: 0;
		padding: 0.4em;
		font-size: larger;
	}

	#ui > a {
		margin: 0.1em;
	}

	#ui > a:first-of-type {
		margin-left: 0.4em;
	}
</style>
