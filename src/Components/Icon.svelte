<script lang="ts">
    import * as eva from "eva-icons";
    import { afterUpdate } from "svelte";

    export let animationType: eva.AnimationType;
    export let icon: string;
    export let width: string | number = 30;
    export let height: string | number = 30;
    export let fill: string = null;

    afterUpdate(() => {
        eva.replace();
    });
</script>

<i
    data-eva={icon}
    data-eva-fill={fill}
    data-eva-height={height}
    data-eva-width={width}
    data-eva-animation={animationType}
/>
