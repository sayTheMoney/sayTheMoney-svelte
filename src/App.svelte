<script lang="ts">
    import "normalize.css";
    import "milligram/dist/milligram.css";

    import Player from "./Components/Player.svelte";
    import Footer from "./Components/Footer.svelte";
</script>

<div class="container" id="root">
    <div class="row">
        <div class="column column-80 column-offset-10">
            <h1>💸&nbsp;&nbsp;💰</h1>
            <h3>💴💵💶💳💷</h3>
            <h4>输入金额，即刻到账！</h4>
        </div>
    </div>

    <div class="row"><Player /></div>
</div>

<Footer />

<style>
    :global(body) {
        font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
            "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC",
            "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC",
            "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei",
            "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp",
            sans-serif;
    }

    h1,
    h3,
    h4 {
        text-align: center;
    }

    h4 {
        margin-bottom: 9vh;
    }

    #root {
        margin-top: 24vh;
    }
</style>
