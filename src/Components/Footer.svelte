<script>
    import Icon from "./Icon.svelte";
    import Tooltip from "./Tooltip.svelte";
</script>

<footer>
    <section class="container">
        <span>Designed by <a href="https://github.com/sayTheMoney">@sayTheMoney</a>. Licensed under the MIT License.</span>
    </section>

    <nav class="nav">
        <Tooltip tooltip="Github" position="left">
            <a href="https://github.com/sayTheMoney/sayTheMoney">
                <Icon
                    icon="github-outline"
                    animationType="pulse"
                    fill="#1a2a2a"
                />
            </a>
        </Tooltip>
    </nav>
</footer>

<style>
    footer {
        padding: 1.5rem 0 1rem 0;
        background-color: #f4f5f4;
        width: 100%;
        position: absolute;
        bottom: 0;
        font-size: small;
    }

    footer .container {
        max-width: 100vw;
        width: 100vw;
    }

    footer > .nav {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-40%);
        padding: 0 3rem 0 0;
    }
</style>
